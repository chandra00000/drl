import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { publicComponent } from "./layouts/public/public.component";
import { secureComponent } from "./layouts/secure/secure.component";
import { authComponent } from "./layouts/auth/auth.component";
import { ForgotpasswordComponent } from './pages/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './pages/resetpassword/resetpassword.component';
import { RunnerLiveviewComponent } from "./pages/liveview/runner-liveview/runner-liveview.component";


const routes: Routes = [
  // otherwise redirect to Login
  {
    path: '',
    component: authComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./pages/login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'forgot-password',
        component: ForgotpasswordComponent,
      },
      {
        path: 'reset-password/:id/:password_token',
        component: ResetpasswordComponent,
      },
    ],
  },
  // App routes goes here here
  {
    path: '',
    component: secureComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'liveview',
        loadChildren: () =>
          import('./pages/liveview/liveview.module').then(
            (m) => m.LiveviewModule
          ),

      },
      {
        path: 'runner-view',
        component: RunnerLiveviewComponent,
      },
      {
        path: 'task',
        loadChildren: () =>
          import('./pages/task/Task.module').then(
            (m) => m.TaskModule
          ),

      },
      {
        path: 'runner',
        loadChildren: () =>
          import('./pages/runner/Runner.module').then(
            (m) => m.RunnerModule
          ),

      },
      {
        path: 'location',
        loadChildren: () =>
          import('./pages/location/Location.module').then(
            (m) => m.LocationModule
          ),

      },
      {
        path: 'tour',
        loadChildren: () =>
          import('./pages/tour/Tour.module').then(
            (m) => m.TourModule
          ),

      },
      {
        path: 'plan',
        loadChildren: () =>
          import('./pages/plan/plan.module').then(
            (m) => m.PlanModule
          ),

      },
      {
        path: 'plan-summery',
        loadChildren: () =>
          import('./pages/plan-summery/plan-summery.module').then(
            (m) => m.PlanSummeryModule
          ),

      },
      {
        path: 'user',
        loadChildren: () =>
        import('./pages/users/users.module').then(
          (m) => m.UsersModule
          ),
      },
      {
        path: 'customer',
        loadChildren: () =>
        import('./pages/customers/customers.module').then(
          (m) => m.CustomersModule
          ),
      },
      {
        path: 'leaves',
        loadChildren: () =>
        import('./pages/leaves/leaves.module').then(
          (m) => m.LeavesModule
          ),
      },
      {
        path: 'myaccount',
        loadChildren: () =>
        import('./pages/myaccount/myaccount.module').then(
          (m) => m.MyaccountModule
          ),
      },

      {
        path: 'settings',
        loadChildren: () =>
          import('./pages/setting/setting.module').then((m) => m.SettingModule),
      },

    ],
  },
  //Public routes goes here
  {
    path: '',
    component: publicComponent,
    children: [



    ],
  },
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
