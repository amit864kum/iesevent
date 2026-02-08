/**
 * Admin API Helper Library
 * Handles all API calls with admin authentication
 */

import { getAdminToken, logout } from './auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Generic fetch wrapper with admin authentication
 */
async function fetchAPI<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = getAdminToken();

    // If no token and not requesting public/login endpoints, throw or similar (though client should handle)
    // But for now we just send empty or headers

    const defaultHeaders: HeadersInit = {
        'Content-Type': 'application/json',
        'x-admin-token': token || '',
    };

    // Don't set Content-Type for FormData (let browser set it with boundary)
    if (options.body instanceof FormData) {
        delete (defaultHeaders as Record<string, string>)['Content-Type'];
    }

    const response = await fetch(url, {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
            // Token expired or invalid
            if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
                logout(); // Auto logout on auth error
            }
        }
        throw new Error(data.message || 'Something went wrong');
    }

    return data;
}

export async function login(email: string, password: string): Promise<void> {
    const data = await fetchAPI<{ success: boolean; token: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });

    // Use the imported setAdminToken to save the token
    // We cannot import setAdminToken inside fetchAPI because of circular dependency risk if not careful,
    // but auth.ts is separate so it's fine.
    // However, here we need to dynamic import or use the one we imported at top if available.
    // Check top imports.
    // Actually, I'll just use localStorage directly or need to make sure setAdminToken is exported from api.ts via auth.ts
    // Let's check imports in api.ts
    const { setAdminToken } = require('./auth');
    setAdminToken(data.token);
}

// ============ Gallery API ============

export interface GalleryImage {
    _id: string;
    title: string;
    description?: string;
    imageUrl: string;
    cloudinaryId: string;
    category: string;
    order: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface GalleryResponse {
    success: boolean;
    count: number;
    data: GalleryImage[];
}

export interface SingleGalleryResponse {
    success: boolean;
    data: GalleryImage;
}

export async function getGalleryImages(category?: string, includeInactive = true): Promise<GalleryResponse> {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.append('category', category);
    if (includeInactive) params.append('active', 'true'); // For admin, get all
    const queryString = params.toString() ? `?${params.toString()}` : '';
    return fetchAPI<GalleryResponse>(`/gallery${queryString}`);
}

export async function createGalleryImage(formData: FormData): Promise<SingleGalleryResponse> {
    return fetchAPI<SingleGalleryResponse>('/gallery', {
        method: 'POST',
        body: formData,
    });
}

export async function updateGalleryImage(id: string, formData: FormData): Promise<SingleGalleryResponse> {
    return fetchAPI<SingleGalleryResponse>(`/gallery/${id}`, {
        method: 'PUT',
        body: formData,
    });
}

export async function deleteGalleryImage(id: string): Promise<{ success: boolean; message: string }> {
    return fetchAPI(`/gallery/${id}`, {
        method: 'DELETE',
    });
}

// ============ Testimonials API ============

export interface Testimonial {
    _id: string;
    name: string;
    email?: string;
    eventType?: string;
    message: string;
    rating: number;
    isActive: boolean;
    isFeatured: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface TestimonialsResponse {
    success: boolean;
    count: number;
    data: Testimonial[];
}

export interface SingleTestimonialResponse {
    success: boolean;
    data: Testimonial;
}

export async function getTestimonials(): Promise<TestimonialsResponse> {
    return fetchAPI<TestimonialsResponse>('/testimonials?active=true');
}

export async function updateTestimonial(
    id: string,
    data: Partial<Testimonial>
): Promise<SingleTestimonialResponse> {
    return fetchAPI<SingleTestimonialResponse>(`/testimonials/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
}

export async function deleteTestimonial(id: string): Promise<{ success: boolean; message: string }> {
    return fetchAPI(`/testimonials/${id}`, {
        method: 'DELETE',
    });
}

// ============ Contact API ============

export interface ContactMessage {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    eventType?: string;
    eventDate?: string;
    message: string;
    isRead: boolean;
    isArchived: boolean;
    createdAt: string;
}

export interface ContactResponse {
    success: boolean;
    count: number;
    data: ContactMessage[];
}

export interface UnreadCountResponse {
    success: boolean;
    data: { count: number };
}

export async function getContactMessages(archived = false): Promise<ContactResponse> {
    const params = archived ? '?archived=true' : '';
    return fetchAPI<ContactResponse>(`/contact${params}`);
}

export async function getUnreadCount(): Promise<UnreadCountResponse> {
    return fetchAPI<UnreadCountResponse>('/contact/unread/count');
}

export async function markMessageAsRead(id: string): Promise<{ success: boolean }> {
    return fetchAPI(`/contact/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ isRead: true }),
    });
}

export async function archiveMessage(id: string): Promise<{ success: boolean }> {
    return fetchAPI(`/contact/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ isArchived: true }),
    });
}

export async function deleteContactMessage(id: string): Promise<{ success: boolean; message: string }> {
    return fetchAPI(`/contact/${id}`, {
        method: 'DELETE',
    });
}

// ============ Dashboard Stats ============

export interface DashboardStats {
    galleryCount: number;
    testimonialsCount: number;
    unreadMessages: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
    try {
        const [gallery, testimonials, unread] = await Promise.all([
            getGalleryImages(),
            getTestimonials(),
            getUnreadCount(),
        ]);

        return {
            galleryCount: gallery.count,
            testimonialsCount: testimonials.count,
            unreadMessages: unread.data.count,
        };
    } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
        return {
            galleryCount: 0,
            testimonialsCount: 0,
            unreadMessages: 0,
        };
    }
}
