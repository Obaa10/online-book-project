<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{

    public function index()
    {
        $books = Book::all();
        return response()->json($books);
    }


    public function store(Request $request)
    {
        $book = new Book();
        $book->title = $request->input('title');
        $book->author = $request->input('author');
        $book->relies_date = $request->input('relies_date');
        $book->pages = $request->input('pages');
        $book->price = $request->input('price');
        $book->save();

        return response()->json($book, 201);
    }

    public function show(string $id)
    {
        $book = Book::find($id);
        if (!$book) {
            return response()->json(['message' => 'Book not found'], 404);
        }

        return response()->json($book);
    }


    public function update(Request $request, string $id)
    {
        $book = Book::find($id);
        if (!$book) {
            return response()->json(['message' => 'Book not found'], 404);
        }

        $book->title = $request->input('title');
        $book->author = $request->input('author');
        $book->relies_date = $request->input('relies_date');
        $book->pages = $request->input('pages');
        $book->price = $request->input('price');
        $book->save();

        return response()->json($book);
    }


    public function destroy(string $id)
    {
        $book = Book::find($id);
        if (!$book) {
            return response()->json(['message' => 'Book not found'], 404);
        }

        $book->delete();

        return response()->json(['message' => 'Book deleted']);
    }
}