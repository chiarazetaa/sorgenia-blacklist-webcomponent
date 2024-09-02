import { Component, h, Host, Prop } from '@stencil/core';
import { handleError } from '../../../utils/utils';

@Component({
  tag: 'export-table-modal',
  shadow: false,
})
export class ExportTableModal {
  @Prop() exportFn: (exportType: 'csv' | 'xls') => void;

  async download(exportType: 'csv' | 'xls') {
    try {
      await this.exportFn(exportType);
    } catch (e) {
      handleError(e);
    }
  }

  render() {
    return <Host>
      <div class="w-full justify-content-center d-flex">
        <div class="d-flex flex-column justify-content-center">
          <b2w-button
            onB2wButtonClick={() => this.download('csv')} type="icon-secondary"
            iconName="download"
            custom-style=".B2wButton{width: 160px !important;margin-right:1rem;} "
            text="Download CSV">
          </b2w-button>
          <b2w-button
            style={{ 'margin-top': '1rem' }}
            onB2wButtonClick={() => this.download('xls')} type="icon-secondary"
            iconName="download"
            custom-style=".B2wButton{width: 160px !important;margin-right:1rem;} "
            text="Download XLS">
          </b2w-button>
        </div>
      </div>
    </Host>;
  }
}

export interface NewModalTemplateAbiCab {
  code?: string;
  type?: 'abi' | 'cab';
  data_inserimento?: string;
}
