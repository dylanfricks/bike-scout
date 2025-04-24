import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

@Injectable()
export class CustomReuseStrategy implements RouteReuseStrategy {

    private routeStore = new Map<string, DetachedRouteHandle>();

    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        if (!route.routeConfig || !route.routeConfig.path) {
            return;
        }

        this.routeStore.set(route?.routeConfig?.path, handle);
    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        const path = route?.routeConfig?.path;
        return Boolean(
          path && ['search', 'bike'].includes(path) && !!this.routeStore.get(path)
        );
      }

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        const path = route?.routeConfig?.path;
        return Boolean(path && ['search', 'bike'].includes(path));
    }

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        if (!route.routeConfig || !route.routeConfig.path) {
            return null;
        }
        const path = route.routeConfig?.path;
        return path && this.routeStore.get(path) || null;
    }

    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return future.routeConfig === curr.routeConfig;
    }
}