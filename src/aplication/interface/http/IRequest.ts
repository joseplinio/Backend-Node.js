export interface IRequest<T> {
	body?: T
	params?: Record<string, string>
	query?: Record<string, T>
	// headers: Record<string, string> vai vir essa bomba
	

}
