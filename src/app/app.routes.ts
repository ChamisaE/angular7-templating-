import {RouterModule, Routes} from "@angular/router";
import {SplashComponent} from "./splash/splash.component";
import {APP_BASE_HREF} from "@angular/common";
import {DeepDiveInterceptor} from "./shared/interceptors/deep.dive.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {PostService} from "./shared/services/post.service";
import {SessionService} from "./shared/services/session.service";
import {MainNavComponent} from "./shared/components/main-nav.component";
import {PostsComponent} from "./post/posts.component";


export const allAppComponents = [SplashComponent, MainNavComponent, PostsComponent];

export const routes: Routes = [
	{path: "posts", component: PostsComponent},
	{path: "", component: SplashComponent}
];

// an array of services

const services: any[] = [SessionService, PostService];

// an array of misc providers
const providers: any[] = [
	{provide: APP_BASE_HREF, useValue: window["_base_href"]},
	{provide: HTTP_INTERCEPTORS, useClass: DeepDiveInterceptor, multi: true}
];

export const appRoutingProviders: any[] = [providers, services];


export const routing = RouterModule.forRoot(routes);