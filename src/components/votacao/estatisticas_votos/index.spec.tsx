import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import EstatisticasVotos from '.';

describe('<EstatisticasVotos />', () => {
  it('calcula e exibe porcentagens corretamente', () => {
    render(<EstatisticasVotos total={10} sim={7} nao={3} />);

    expect(screen.getByText('7 (70%)')).toBeInTheDocument();
    expect(screen.getByText('3 (30%)')).toBeInTheDocument();

    const simSection = screen.getByText(/^SIM$/i).closest('div')!;
    const simBar = simSection.parentElement!.nextElementSibling!.querySelector(
      'div',
    )! as HTMLElement;
    expect(simBar).toHaveStyle({ width: '70%' });

    const naoSection = screen.getByText(/^NÃO$/i) || screen.getByText(/^NAO$/i);
    const naoBar = naoSection
      .closest('div')!
      .parentElement!.nextElementSibling!.querySelector('div')! as HTMLElement;
    expect(naoBar).toHaveStyle({ width: '30%' });
  });
});
