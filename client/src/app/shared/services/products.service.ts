import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {

    constructor(
        private http: HttpClient,
    ) { }

    addProduct(payload: any): Observable<any> {
        return this.http.post('http://localhost:5000/api/product/create', payload).pipe(
            map((data: any) => {
                return data;
            })
        );
    }
    getAllProducts(): Observable<any> {
        return this.http.get('http://localhost:5000/api/product/all').pipe(
            map((data: any) => {
                return data.products;
            })
        );
    }

    deleteProduct(id: string): Observable<any> {
        return this.http.delete(`http://localhost:5000/api/product/${id}`).pipe(
            map((data: any) => {
                return data;
            })
        );
    }

    getProduct(id: string): Observable<any> {
        return this.http.get(`http://localhost:5000/api/product/${id}`).pipe(
            map((data: any) => {
                return data;
            })
        );
    }

    updateProduct(id: string, payload: any): Observable<any> {
        return this.http.put(`http://localhost:5000/api/product/${id}`, payload).pipe(
            map((data: any) => {
                return data;
            })
        );
    }
}
