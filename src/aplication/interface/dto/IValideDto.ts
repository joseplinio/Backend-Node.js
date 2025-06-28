export interface IValideDto<T, V> {
	// Tranforma o metodo em ser realmente generico podendo ser usando para mais coias
	// dtoClass: new () => T é um munod de falar que ele vai ser uma instancia rela de uma
	// class e vai retorna T
	valideDto<T extends object>(dtoClass: new () => T, data: V): Promise<T>
}
