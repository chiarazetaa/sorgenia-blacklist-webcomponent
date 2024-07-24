import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'show-customers-pod-pdr-modal',
  shadow: false,
})
export class EditPodPdrModal {
  @Prop() customers: any[];
  @Prop() customerRequestingActivation: any;

  componentWillLoad() {
  }

  columns = [
    {
      title: 'CRM ID',
      field: 'crm_id',
      // formatterParams:{labelField:"crm_id",url:`${window.location.hostname}/web#id=${crm_id}`,target:"_self"},
    },
    {
      title: 'Codice cliente',
      field: 'codice_cliente',
    },
    {
      title: 'Codice fiscale',
      field: 'codice_fiscale',
    },
    {
      title: 'Nome',
      field: 'nome',
    },
    {
      title: 'Cognome',
      field: 'cognome',
    },
  ];

  render() {
    return <Host>
      <h6>Clienti associati al POD/PDR</h6>
      <b2w-table
        id={'pod-pdr-table-clienti'}
        placeholder={'Nessun dato trovato'}
        payload-columns={JSON.stringify(this.columns)}
        payload-data={JSON.stringify(this.customers)}
        layout={'fitColumns'}
      ></b2w-table>


      {this.customerRequestingActivation && <div class="mt-5"><h6>Ultimo Cliente richiedente attivazione contratto con pod in blacklist</h6>
        <b2w-table
          id={'pod-pdr-table-cliente-requesting-activation'}
          placeholder={'Nessun dato trovato'}
          payload-columns={JSON.stringify(this.columns)}
          payload-data={JSON.stringify([this.customerRequestingActivation])}
          layout={'fitColumns'}
        ></b2w-table>
      </div>}
    </Host>;
  }
}
