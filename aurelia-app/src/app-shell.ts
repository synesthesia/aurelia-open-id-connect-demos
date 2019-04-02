import { autoinject, Aurelia } from "aurelia-framework";
import { RouterConfiguration, Router, AppRouter } from "aurelia-router";
import { User } from "oidc-client";
import { OpenIdConnect, OpenIdConnectRoles } from "aurelia-open-id-connect";

@autoinject()
export class AppShell {

  private user: User;

  constructor(private openIdConnect: OpenIdConnect, private router: AppRouter, private aurelia: Aurelia) {
    this.openIdConnect.observeUser((user: User) => this.user = user);
  }

  attached() {
    this.setRoot();
  }

  public configureRouter(routerConfiguration: RouterConfiguration, router: AppRouter) {

    // switch from hash (#) to slash (/) navigation
    routerConfiguration.options.pushState = true;
    routerConfiguration.title = "Home page";

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

  setRoot() {
    this.router.navigate('/', { replace: true, trigger: false }); //Not actually needed here, but is if the router has already been configured.
    if (this.user != null) {
      console.log("Setting root to app");
        this.aurelia.setRoot("app");
    }
    else {
      console.log("Settign root to login");  
      this.aurelia.setRoot("login");
        
    }
  }
}
