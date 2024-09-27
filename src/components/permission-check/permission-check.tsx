import { Component, Host, h, Prop, State } from '@stencil/core';
import { SharedApi } from '../../api/SharedApi';
import { getSharedStore } from '../../store/shared.store';
import { canEditRecords, canShowRecords } from '../../services/permission-service';
import { handleError } from '../../utils/utils';

@Component({
  tag: 'permission-check',
  styleUrl: 'permission-check.css',
  shadow: true,
})
export class PermissionCheck {

  @Prop() backendUrl: string;
  @Prop() additionalHeaders: any;

  @State() showContent = false;
  sharedApi: SharedApi;
  sharedStore = getSharedStore();

  componentWillLoad() {
    this.sharedApi = new SharedApi(this.backendUrl, this.additionalHeaders);
    this.sharedApi.getJwtPayload().then(res => {
      this.sharedStore.state.tokenPayload = { ...res['response'] };
      this.sharedStore.state.canShowRecords = canShowRecords();
      this.sharedStore.state.canEditRecords = canEditRecords();
      this.showContent = true;
    }).catch(err=>{
      handleError(err);
    })
  }

  render() {
    return (
      <Host>
        {this.showContent ? <slot></slot> :
          <b2w-spinner style={{ 'margin-top': '1rem' }} type="small" visible="true" fixed="false"></b2w-spinner>
        }
      </Host>
    );
  }

}
