<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Tag;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function __construct()
    {
        $this->middleware("auth:sanctum")->only(['store', 'update', 'destroy']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $articles = Article::all();
        $articles->load("tags");
        return response()->json($articles);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "title" => "required",
            "content" => "required",
            "thumbnailURL" => "required",
            "mediaURL" => "required",
            "tags"=>"required"
        ]);

        $article = new Article();
        $article->title = $request->input('title');
        $article->content = $request->input('content');
        $article->thumbnailURL = $request->input('thumbnailURL');
        $article->mediaURL = $request->input('mediaURL');
        $article->leadStory = 0;
        $article->user_id = auth()->user()->id;
        $tags = explode(' ', $request->input('tags'));
        $mediaType = pathinfo($request->input("mediaURL"), PATHINFO_EXTENSION);

        if($mediaType == "jpg" || $mediaType == "png"){
            $article->mediaType = "image";
        }

        if($mediaType == "mp4"){
            $article->mediaType = "video";
        }

        if($mediaType == "mp3" || $mediaType == "mov" || $mediaType == "wav"){
            $article->mediaType = "audio";
        }

        // if($request->file("mediaURL")->isValid()) {
        //     $f = $request->file("mediaURL")->hashName();
        //     $request->file("mediaURL")->storeAs("public/upload", $f);
        //     $image = "/storage/upload/$f";
        //     $article->mediaURL = $image;
        // }

        $article->save();

        foreach($tags as $t){
            $select = Tag::whereRaw('LOWER(name) = ?', strtolower($t))->first();
            if($select){
                $article->tags()->attach($select->id);
            }
            else{
                $tag = new Tag();
                $tag->name = $t;
                $tag->save();
                $article->tags()->attach($tag->id);
            }
        }
        return response()->json($article);
}

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        $article->load("tags", "users");
        return response()->json($article);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Article $article)
    {
        $request->validate([
            "title" => "required",
            "content" => "required",
            "thumbnailURL" => "required",
            "mediaURL" => "required",
            "tags"=>"required"
        ]);
        
        $article->tags()->detach();

        $article->title = $request->input('title');
        $article->content = $request->input('content');
        $article->thumbnailURL = $request->input('thumbnailURL');
        $article->mediaURL = $request->input('mediaURL');
        $article->leadStory = 0;
        $article->user_id = auth()->user()->id;
        $tags = explode(' ', $request->input('tags'));
        $mediaType = pathinfo($request->input("mediaURL"), PATHINFO_EXTENSION);

        if($mediaType == "jpg" || $mediaType == "png"){
            $article->mediaType = "image";
        }

        if($mediaType == "mp4"){
            $article->mediaType = "video";
        }

        if($mediaType == "mp3" || $mediaType == "mov" || $mediaType == "wav"){
            $article->mediaType = "audio";
        }

        $article->save();

        foreach($tags as $t){
            $select = Tag::whereRaw('LOWER(name) = ?', strtolower($t))->first();
            if($select){
                $article->tags()->attach($select->id);
            }
            else{
                $tag = new Tag();
                $tag->name = $t;
                $tag->save();
                $article->tags()->attach($tag->id);
            }
        }
        return response()->json($article);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        $article->tags()->detach();
        $article->delete();
        return response()->noContent();
    }
}
