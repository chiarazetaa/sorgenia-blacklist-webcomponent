import { Component, h, Host, Prop, State } from '@stencil/core';

@Component({
  tag: 'show-history-modal',
  shadow: false,
})
export class ShowHistoryModal {
  @Prop() recordWithHistory: {created_at:string, created_by:string, update_history: {updated_at:string, updated_by:string, updated_fields: any}[]};
  @State() formattedDate: string;

  columns = [
    {
      title: 'Aggiornato da',
      field: 'updated_by'
      // formatterParams:{labelField:"crm_id",url:`${window.location.hostname}/web#id=${crm_id}`,target:"_self"},
    },
    {
      title: 'Aggiornato il',
      field: 'updated_at',
      formatter: 'datetime',
      visible: true,
      hozAlign: 'left',
      emitEventOnSorting: true,
      formatterParams: {
        inputFormat: 'yyyy-MM-dd HH:mm:ss',
        outputFormat: 'dd/MM/yyyy HH:mm',
        invalidPlaceholder: '-',
        timezone: 'Europe/Rome',
      },
    }
  ];

  componentWillLoad() {
    // Use datetimeformatoptions to add time to the date
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    this.formattedDate = new Intl.DateTimeFormat('it-IT', options).format(new Date(this.recordWithHistory?.created_at));
  }

  render() {
    return <Host>
      <p>Creato il <strong>{this.formattedDate}</strong> da <strong>{this.recordWithHistory?.created_by}</strong>
      </p>
      <b2w-table
        id={'records-with-history-table'}
        placeholder={'Nessun dato trovato'}
        payload-columns={JSON.stringify(this.columns)}
        payload-data={JSON.stringify(this.recordWithHistory.update_history)}
        layout={'fitColumns'}
      ></b2w-table>
    </Host>;
  }
}
