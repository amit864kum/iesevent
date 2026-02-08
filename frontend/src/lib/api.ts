/**
 * API Helper Library
 * Handles all API calls to the backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Generic fetch wrapper with error handling
 */
async function fetchAPI<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const defaultHeaders: HeadersInit = {
        'Content-Type': 'application/json',
    };

    const response = await fetch(url, {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
    }

    return data;
}

// ============ Gallery API ============

export interface GalleryImage {
    _id: string;
    title: string;
    description?: string;
    imageUrl: string;
    category: string;
    order: number;
    isActive: boolean;
    createdAt: string;
}

export interface GalleryResponse {
    success: boolean;
    count: number;
    data: GalleryImage[];
}

export interface CategoryResponse {
    success: boolean;
    data: { name: string; count: number }[];
}

export async function getGalleryImages(category?: string): Promise<GalleryResponse> {
    const params = category && category !== 'all' ? `?category=${category}` : '';
    return fetchAPI<GalleryResponse>(`/gallery${params}`);
}

export async function getGalleryCategories(): Promise<CategoryResponse> {
    return fetchAPI<CategoryResponse>('/gallery/categories');
}

// ============ Testimonials API ============

export interface Testimonial {
    _id: string;
    name: string;
    email?: string;
    eventType?: string;
    message: string;
    rating: number;
    isFeatured: boolean;
    createdAt: string;
}

export interface TestimonialsResponse {
    success: boolean;
    count: number;
    data: Testimonial[];
}

export interface SubmitTestimonialData {
    name: string;
    email?: string;
    eventType?: string;
    message: string;
    rating?: number;
}

export async function getTestimonials(featured?: boolean, limit?: number): Promise<TestimonialsResponse> {
    const params = new URLSearchParams();
    if (featured) params.append('featured', 'true');
    if (limit) params.append('limit', limit.toString());
    const queryString = params.toString() ? `?${params.toString()}` : '';
    return fetchAPI<TestimonialsResponse>(`/testimonials${queryString}`);
}

export async function submitTestimonial(data: SubmitTestimonialData): Promise<{ success: boolean; message: string }> {
    return fetchAPI('/testimonials', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

// ============ Contact API ============

export interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    eventType?: string;
    eventDate?: string;
    message: string;
}

export async function submitContactForm(data: ContactFormData): Promise<{ success: boolean; message: string }> {
    return fetchAPI('/contact', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}
