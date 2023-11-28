export default function formatarDataBrasileira(data: Date){
  const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
  return new Date(data.seconds * 1000).toLocaleTimeString('pt-BR', options);
};
