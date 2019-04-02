import { autoinject, Aurelia } from "aurelia-framework";
import { RouterConfiguration, Router } from "aurelia-router";
import { User } from "oidc-client";
import { OpenIdConnect, OpenIdConnectRoles } from "aurelia-open-id-connect";

@autoinject
export class Login {

  private router: Router;
  private user: User;

  constructor(private openIdConnect: OpenIdConnect, private aurelia: Aurelia) {
    this.openIdConnect.observeUser((user: User) => this.user = user);
  }

  attached() {

    if (this.user != null) {
      console.log("Setting root to app");
      this.router.navigate('/', { replace: true, trigger: false });
      this.aurelia.setRoot("app");
    }
    
  }


  public configureRouter(routerConfiguration: RouterConfiguration, router: Router) {

    // switch from hash (#) to slash (/) navigation
    routerConfiguration.options.pushState = true;
    routerConfiguration.title = "OpenID Connect Login Root";

    // configure routes
    routerConfiguration.map([
      {
        moduleId: "index",
        name: "index",
        route: ["", "index"],
        title: "index",
        nav: true,
      }
    ]);

    this.openIdConnect.configure(routerConfiguration);
    this.router = router;
  }
}
