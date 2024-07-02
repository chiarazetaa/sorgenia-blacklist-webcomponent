import {
  FilterFieldBoolean, FilterFieldDate,
  FilterFieldPicklist,
  FilterFieldString,
  TableField,
} from '../interfaces/fields.interface';

export const abiCabFields: ((FilterFieldString | FilterFieldBoolean | FilterFieldPicklist | FilterFieldDate) & TableField)[] = [
  // {
  //   text: 'Esito Inviato A Crm',
  //   value: 'esito_inviato_a_crm',
  //   placeholder: 'Esito Inviato A Crm',
  //   type: 'boolean',
  //   title: 'Esito Inviato A Crm',
  //   field: 'esito_inviato_a_crm',
  //   headerSort: true,
  //   formatter: 'fonts',
  //   visible: true,
  //   hozAlign: 'left',
  //   frozen: true,
  //   emitEventOnSorting: true,
  // },
  // {
  //   text: 'Id Richiesta',
  //   value: 'id_richiesta',
  //   placeholder: 'Id Richiesta',
  //   type: 'boolean',
  //   title: 'Id Richiesta',
  //   field: 'id_richiesta',
  //   headerSort: true,
  //   formatter: 'fonts',
  //   visible: true,
  // },
  // {
  //   text: 'Stato Pratica',
  //   value: 'stato_pratica',
  //   placeholder: 'Stato Pratica',
  //   type: 'boolean',
  //   title: 'Stato Pratica',
  //   field: 'stato_pratica',
  //   headerSort: true,
  //   formatter: 'fonts',
  //   visible: true,
  // },
  // {
  //   text: 'Stato Richiesta Cerved',
  //   value: 'stato_richiesta_cerved',
  //   placeholder: 'Stato Richiesta Cerved',
  //   type: 'boolean',
  //   title: 'Stato Richiesta Cerved',
  //   field: 'stato_richiesta_cerved',
  //   headerSort: true,
  //   formatter: 'fonts',
  //   visible: true,
  // },
  // {
  //   text: 'Data Inserimento Richiesta',
  //   value: 'data_inserimento_richiesta',
  //   placeholder: 'Data Inserimento Richiesta',
  //   type: 'date',
  //   title: 'Data Inserimento Richiesta',
  //   field: 'data_inserimento_richiesta',
  //   headerSort: true,
  //   formatter: 'fonts',
  //   visible: true,
  // },
  // {
  //   text: 'Con Deroga Automatica',
  //   value: 'con_deroga_automatica',
  //   placeholder: 'Con Deroga Automatica',
  //   type: 'boolean',
  //   title: 'Con Deroga Automatica',
  //   field: 'con_deroga_automatica',
  //   headerSort: true,
  //   formatter: 'fonts',
  //   visible: true,
  // },
  // {
  //   text: 'Forzatura Credit Check',
  //   value: 'forzatura_credit_check',
  //   placeholder: 'Forzatura Credit Check',
  //   type: 'boolean',
  //   title: 'Forzatura Credit Check',
  //   field: 'forzatura_credit_check',
  //   headerSort: true,
  //   formatter: 'fonts',
  //   visible: true,
  // },
  // {
  //   text: 'Area Cliente',
  //   value: 'area_cliente',
  //   placeholder: 'Area Cliente',
  //   type: 'string',
  //   title: 'Area Cliente',
  //   field: 'area_cliente',
  //   headerSort: true,
  //   formatter: 'fonts',
  //   visible: true,
  // },
  // {
  //   text: 'Codice Proposta Contratto',
  //   value: 'codice_proposta_contratto',
  //   placeholder: 'Codice Proposta Contratto',
  //   type: 'boolean',
  //   title: 'Codice Proposta Contratto',
  //   field: 'codice_proposta_contratto',
  //   headerSort: true,
  //   formatter: 'fonts',
  //   visible: true,
  // },
  // {
  //   text: 'Partita Iva',
  //   value: 'partita_iva',
  //   placeholder: 'Partita Iva',
  //   type: 'boolean',
  //   title: 'Partita Iva',
  //   field: 'partita_iva',
  //   headerSort: true,
  //   formatter: 'fonts',
  //   visible: true,
  // },
  // {
  //   text: 'Codice Fiscale Richiesta',
  //   value: 'codice_fiscale_richiesta',
  //   placeholder: 'Codice Fiscale Richiesta',
  //   type: 'boolean',
  //   title: 'Codice Fiscale Richiesta',
  //   field: 'codice_fiscale_richiesta',
  //   headerSort: true,
  //   formatter: 'fonts',
  //   visible: true,
  // },
  // {
  //   text: 'Codice Cliente',
  //   value: 'codice_cliente',
  //   placeholder: 'Codice Cliente',
  //   type: 'boolean',
  //   title: 'Codice Cliente',
  //   field: 'codice_cliente',
  //   headerSort: true,
  //   formatter: 'fonts',
  //   visible: true,
  // },
  // {
  //   text: 'Req Ragione Sociale',
  //   value: 'req_ragione_sociale',
  //   placeholder: 'Req Ragione Sociale',
  //   type: 'boolean',
  //   title: 'Req Ragione Sociale',
  //   field: 'req_ragione_sociale',
  //   headerSort: true,
  //   formatter: 'fonts',
  //   visible: true,
  // },
  // {
  //   text: 'Pregiudizievoli Esatri',
  //   value: 'pregiudizievoli_esatri',
  //   placeholder: 'Pregiudizievoli Esatri',
  //   type: 'boolean',
  //   title: 'Pregiudizievoli Esatri',
  //   field: 'pregiudizievoli_esatri',
  //   headerSort: true,
  //   formatter: 'fonts',
  //   visible: true,
  // },
  // {
  //   text: 'Pregiudizievoli Gravi',
  //   value: 'pregiudizievoli_gravi',
  //   placeholder: 'Pregiudizievoli Gravi',
  //   type: 'boolean',
  //   title: 'Pregiudizievoli Gravi',
  //   field: 'pregiudizievoli_gravi',
  //   headerSort: true,
  //   formatter: 'fonts',
  //   visible: true,
  // },
  // {
  //   text: 'Protesti',
  //   value: 'protesti',
  //   placeholder: 'Protesti',
  //   type: 'boolean',
  //   title: 'Protesti',
  //   field: 'protesti',
  //   headerSort: true,
  //   formatter: 'fonts',
  //   visible: true,
  // },
  // {
  //   text: 'Esito',
  //   value: 'esito',
  //   placeholder: 'Esito',
  //   type: 'boolean',
  //   title: 'Esito',
  //   field: 'esito',
  //   headerSort: true,
  //   formatter: 'fonts',
  //   visible: true,
  // },
  // {
  //   text: 'Score Sic Descrizione',
  //   value: 'score_sic_descrizione',
  //   placeholder: 'Score Sic Descrizione',
  //   type: 'boolean',
  //   title: 'Score Sic Descrizione',
  //   field: 'score_sic_descrizione',
  //   headerSort: true,
  //   formatter: 'fonts',
  //   visible: true,
  // },
  // {
  //   text: 'Res Score Sic',
  //   value: 'res_score_sic',
  //   placeholder: 'Res Score Sic',
  //   type: 'boolean',
  //   title: 'Res Score Sic',
  //   field: 'res_score_sic',
  //   headerSort: true,
  //   formatter: 'fonts',
  //   visible: true,
  // },
  // {
  //   text: 'Area Geo',
  //   value: 'area_geo',
  //   placeholder: 'Area Geo',
  //   type: 'boolean',
  //   title: 'Area Geo',
  //   field: 'area_geo',
  //   headerSort: true,
  //   formatter: 'fonts',
  //   visible: true,
  // },
  // {
  //   text: 'Type Attiv',
  //   value: 'type_attiv',
  //   placeholder: 'Type Attiv',
  //   type: 'boolean',
  //   title: 'Type Attiv',
  //   field: 'type_attiv',
  //   headerSort: true,
  //   formatter: 'fonts',
  //   visible: true,
  // },
  // {
  //   text: 'Tot Num Contr',
  //   value: 'tot_num_contr',
  //   placeholder: 'Tot Num Contr',
  //   type: 'boolean',
  //   title: 'Tot Num Contr',
  //   field: 'tot_num_contr',
  //   headerSort: true,
  //   formatter: 'fonts',
  //   visible: true,
  // },
  // {
  //   text: 'Origine',
  //   value: 'origine',
  //   placeholder: 'Origine',
  //   type: 'boolean',
  //   title: 'Origine',
  //   field: 'origine',
  //   headerSort: true,
  //   formatter: 'fonts',
  //   visible: true,
  // },
  // {
  //   text: 'Codice Iban',
  //   value: 'codice_iban',
  //   placeholder: 'Codice Iban',
  //   type: 'boolean',
  //   title: 'Codice Iban',
  //   field: 'codice_iban',
  //   headerSort: true,
  //   formatter: 'fonts',
  //   visible: true,
  // },
  // {
  //   text: 'Nome Agenzia',
  //   value: 'nome_agenzia',
  //   placeholder: 'Nome Agenzia',
  //   type: 'boolean',
  //   title: 'Nome Agenzia',
  //   field: 'nome_agenzia',
  //   headerSort: true,
  //   formatter: 'fonts',
  //   visible: true,
  // },
  // {
  //   text: 'Consumi Punti Attivi Ele',
  //   value: 'consumi_punti_attivi_ele',
  //   placeholder: 'Consumi Punti Attivi Ele',
  //   type: 'boolean',
  //   title: 'Consumi Punti Attivi Ele',
  //   field: 'consumi_punti_attivi_ele',
  //   headerSort: true,
  //   formatter: 'fonts',
  //   visible: true,
  // },
  // {
  //   text: 'Consumi Contrattuali Ele',
  //   value: 'consumi_contrattuali_ele',
  //   placeholder: 'Consumi Contrattuali Ele',
  //   type: 'boolean',
  //   title: 'Consumi Contrattuali Ele',
  //   field: 'consumi_contrattuali_ele',
  //   headerSort: true,
  //   formatter: 'fonts',
  //   visible: true,
  // },
  // {
  //   text: 'Consumi Punti Attivi Gas',
  //   value: 'consumi_punti_attivi_gas',
  //   placeholder: 'Consumi Punti Attivi Gas',
  //   type: 'boolean',
  //   title: 'Consumi Punti Attivi Gas',
  //   field: 'consumi_punti_attivi_gas',
  //   headerSort: true,
  //   formatter: 'fonts',
  //   visible: true,
  // },
  // {
  //   text: 'Consumi Contrattuali Gas',
  //   value: 'consumi_contrattuali_gas',
  //   placeholder: 'Consumi Contrattuali Gas',
  //   type: 'boolean',
  //   title: 'Consumi Contrattuali Gas',
  //   field: 'consumi_contrattuali_gas',
  //   headerSort: true,
  //   formatter: 'fonts',
  //   visible: true,
  // },
  // {
  //   text: 'Codice Fiscale Risposta',
  //   value: 'codice_fiscale_risposta',
  //   placeholder: 'Codice Fiscale Risposta',
  //   type: 'boolean',
  //   title: 'Codice Fiscale Risposta',
  //   field: 'codice_fiscale_risposta',
  //   headerSort: true,
  //   formatter: 'fonts',
  //   visible: true,
  // },
  // {
  //   text: 'Commodity Gas',
  //   value: 'commodity_gas',
  //   placeholder: 'Commodity Gas',
  //   type: 'boolean',
  //   title: 'Commodity Gas',
  //   field: 'commodity_gas',
  //   headerSort: true,
  //   formatter: 'fonts',
  //   visible: true,
  // },
  // {
  //   text: 'Commodity Ele',
  //   value: 'commodity_ele',
  //   placeholder: 'Commodity Ele',
  //   type: 'boolean',
  //   title: 'Commodity Ele',
  //   field: 'commodity_ele',
  //   headerSort: true,
  //   formatter: 'fonts',
  //   visible: true,
  // },
  // {
  //   text: 'Punteggio Zone',
  //   value: 'punteggio_zone',
  //   placeholder: 'Punteggio Zone',
  //   type: 'boolean',
  //   title: 'Punteggio Zone',
  //   field: 'punteggio_zone',
  //   headerSort: true,
  //   formatter: 'fonts',
  //   visible: true,
  // },
  // {
  //   text: 'Fascia Zone',
  //   value: 'fascia_zone',
  //   placeholder: 'Fascia Zone',
  //   type: 'boolean',
  //   title: 'Fascia Zone',
  //   field: 'fascia_zone',
  //   headerSort: true,
  //   formatter: 'fonts',
  //   visible: true,
  // },
  // {
  //   text: 'Stato Del Contratto Prisma',
  //   value: 'stato_del_contratto_prisma',
  //   placeholder: 'Stato Del Contratto Prisma',
  //   type: 'boolean',
  //   title: 'Stato Del Contratto Prisma',
  //   field: 'stato_del_contratto_prisma',
  //   headerSort: true,
  //   formatter: 'fonts',
  //   visible: true,
  // },
  // {
  //   text: 'Causale Di Sospensione',
  //   value: 'causale_di_sospensione',
  //   placeholder: 'Causale Di Sospensione',
  //   type: 'boolean',
  //   title: 'Causale Di Sospensione',
  //   field: 'causale_di_sospensione',
  //   headerSort: true,
  //   formatter: 'fonts',
  //   visible: true,
  // },
  // {
  //   text: 'Campagna Web',
  //   value: 'campagna_web',
  //   placeholder: 'Campagna Web',
  //   type: 'boolean',
  //   title: 'Campagna Web',
  //   field: 'campagna_web',
  //   headerSort: true,
  //   formatter: 'fonts',
  //   visible: true,
  // },
  // {
  //   text: 'Gruppo Campagna Web',
  //   value: 'gruppo_campagna_web',
  //   placeholder: 'Gruppo Campagna Web',
  //   type: 'boolean',
  //   title: 'Gruppo Campagna Web',
  //   field: 'gruppo_campagna_web',
  //   headerSort: true,
  //   formatter: 'fonts',
  //   visible: true,
  // },
  // {
  //   text: 'Legittimo Titolo',
  //   value: 'legittimo_titolo',
  //   placeholder: 'Legittimo Titolo',
  //   type: 'boolean',
  //   title: 'Legittimo Titolo',
  //   field: 'legittimo_titolo',
  //   headerSort: true,
  //   formatter: 'fonts',
  //   visible: true,
  // },
  // {
  //   text: 'Consumi Contrattuali Ele Real',
  //   value: 'consumi_contrattuali_ele_real',
  //   placeholder: 'Consumi Contrattuali Ele Real',
  //   type: 'boolean',
  //   title: 'Consumi Contrattuali Ele Real',
  //   field: 'consumi_contrattuali_ele_real',
  //   headerSort: true,
  //   formatter: 'fonts',
  //   visible: true,
  // },
  // {
  //   text: 'Consumi Contrattuali Gas Real',
  //   value: 'consumi_contrattuali_gas_real',
  //   placeholder: 'Consumi Contrattuali Gas Real',
  //   type: 'boolean',
  //   title: 'Consumi Contrattuali Gas Real',
  //   field: 'consumi_contrattuali_gas_real',
  //   headerSort: true,
  //   formatter: 'fonts',
  //   visible: true,
  // },
  // {
  //   text: 'Flag Frode',
  //   value: 'flag_frode',
  //   placeholder: 'Flag Frode',
  //   type: 'boolean',
  //   title: 'Flag Frode',
  //   field: 'flag_frode',
  //   headerSort: true,
  //   formatter: 'fonts',
  //   visible: true,
  // },
];
