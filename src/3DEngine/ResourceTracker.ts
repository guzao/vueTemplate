import {  Object3D } from "three";

/**
 * 模型追踪
*/
export class ResourceTracker {
	
	
    readonly name = 'ResourceTracker'

    readonly resources = new Set();

	track<T>( resource:T ) {
		if ((resource as any).dispose) {
			this.resources.add( resource );
		}
		return resource;
	}
	untrack<T>( resource:T ) {
		this.resources.delete( resource );
	}
    
	dispose() {
		for ( const resource of this.resources ) {
			if ( resource instanceof Object3D ) {
				if ( resource.parent ) {
					resource.parent.remove( resource );
				}
			}

			if ( (resource as any).dispose ) {
				(resource as any).dispose();
			}
		}
		this.resources.clear();
	}

}
