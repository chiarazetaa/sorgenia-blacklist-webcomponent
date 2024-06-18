import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'blacklist-dashboard-styles',
  styleUrl: 'blacklist-dashboard-styles.css',
  shadow: false,
})
export class BlacklistDashboardStyles {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
