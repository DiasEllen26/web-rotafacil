export default function formatarDataBrasileira(dataInSeconds: number){
  const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' } as Intl.DateTimeFormatOptions;
  return new Date(dataInSeconds * 1000).toLocaleTimeString('pt-BR', options);
};
