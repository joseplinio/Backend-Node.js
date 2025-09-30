export interface IRequest<T> {
	body?: T
	params?: Record<string, string>
	query?: Record<string, T>
	cookies?: object
	headers?: Record<string, string[] | undefined | null>
}
