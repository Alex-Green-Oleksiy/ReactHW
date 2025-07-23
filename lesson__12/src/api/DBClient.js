class DBClient {
    constructor(collectionName, delay = 500, initialData = [], errorRate = 0) {
        this.collectionName = `db_${collectionName}`;
        this.delay = delay;
        this.initialData = initialData;
        this.errorRate = errorRate;
        this._initializeCollection();
    }

    _initializeCollection() {
        if (!localStorage.getItem(this.collectionName)) {
            localStorage.setItem(
                this.collectionName,
                JSON.stringify(this.initialData)
            );
        }
    }

    _getData() {
        return JSON.parse(localStorage.getItem(this.collectionName));
    }

    _setData(data) {
        localStorage.setItem(this.collectionName, JSON.stringify(data));
    }

    _imitateBackendCall(callback) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() < this.errorRate) {
                    reject({
                        message: "Помилка бекенду: сталася невідома помилка.",
                        code: 500,
                        details: "Спробуйте пізніше."
                    });
                } else {
                    try {
                        const result = callback();
                        resolve({ data: result });
                    } catch (e) {
                        reject({
                            message:
                                e.message ||
                                "Непередбачена помилка під час обробки даних.",
                            code: 500,
                            details: e.toString()
                        });
                    }
                }
            }, this.delay);
        });
    }

    async create(item) {
        return this._imitateBackendCall(() => {
            const data = this._getData();
            const newItem = { id: Date.now().toString(), ...item };
            data.push(newItem);
            this._setData(data);
            return newItem;
        });
    }

    async readAll() {
        return this._imitateBackendCall(() => {
            return this._getData();
        });
    }

    async readById(id) {
        return this._imitateBackendCall(() => {
            const data = this._getData();
            const foundItem = data.find((item) => item.id === id);
            if (!foundItem) {
                throw new Error("Елемент не знайдено.");
            }
            return foundItem;
        });
    }

    async readPaginated(page = 1, limit = 10) {
        return this._imitateBackendCall(() => {
            const data = this._getData();
            const totalItems = data.length;
            const totalPages = Math.ceil(totalItems / limit);
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            const items = data.slice(startIndex, endIndex);

            return {
                items: items,
                pagination: {
                    totalItems: totalItems,
                    totalPages: totalPages,
                    currentPage: page,
                    pageSize: limit
                }
            };
        });
    }

    async update(id, updatedItem) {
        return this._imitateBackendCall(() => {
            let data = this._getData();
            const index = data.findIndex((item) => item.id === id);
            if (index > -1) {
                data[index] = { ...data[index], ...updatedItem, id };
                this._setData(data);
                return data[index];
            }
            throw new Error("Елемент для оновлення не знайдено.");
        });
    }

    async delete(id) {
        return this._imitateBackendCall(() => {
            let data = this._getData();
            const initialLength = data.length;
            data = data.filter((item) => item.id !== id);
            this._setData(data);
            if (data.length === initialLength) {
                throw new Error("Елемент для видалення не знайдено.");
            }
            return { message: "Елемент успішно видалено.", id: id };
        });
    }
}

export default DBClient;
