import {Component, OnInit} from "@angular/core";
import {Post} from "../shared/interfaces/post";
import {PostService} from "../shared/services/post.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Status} from "../shared/interfaces/status";

@Component({
	template: require("./posts.component.html")
})

export class PostsComponent implements OnInit {
	posts: Post[];
	postForm: FormGroup;
	status: Status = {status:null, message: null, type: null};

	constructor(private postService: PostService, private formBuilder: FormBuilder) {
	}

	ngOnInit() {
		this.postService.getAllPosts().subscribe(posts => this.posts = posts);
		this.postForm = this.formBuilder.group({
			postTitle: ["", [Validators.maxLength(64), Validators.required]],
			postContent: ["", [Validators.maxLength(1024), Validators.required]]
		});
		this.loadPosts()
	}

	loadPosts() : void {
		this.postService.getAllPosts().subscribe(posts => this.posts = posts);
	}
	createPost(): void {
		let post :Post = {postId : null, postContent: this.postForm.value.postContent, postDate: null, postTitle: this.postForm.value.postTitle};

		this.postService.createPost(post).subscribe(status => {
			this.status = status;
			if(status.status === 200) {
				this.loadPosts();
				this.postForm.reset()
			}
		})
	}

}
