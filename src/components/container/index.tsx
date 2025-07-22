import type { ContainerComponentProps } from '../../interfaces/components/containerComponentProps';

const ContainerComponent = ({ children, cor = 'bg-white' }: ContainerComponentProps) => {
  return <div className={`w-full ${cor} h-auto p-4 sm:p-4 lg:p-4 rounded-lg `}>{children}</div>;
};

export default ContainerComponent;
