export class Product {
    id: number = 1;
    title: string = "";
    desc: string = "";
    img: string = "";
    created_at: string = "";
    updated_at: string = "";
    categories: Category[] = [];
}

export class Category {
    id: number = 1;
    name: string = "";
    created_at: string = "";
    updated_at: string = "";
    pivot: Pivot = new Pivot();
}

export class Pivot {
    book_id: number = 1;
    category_id: number = 1;
} 