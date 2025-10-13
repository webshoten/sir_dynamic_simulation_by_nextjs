import { FanNavigation } from '@/components/fan-navigation';

export default function WorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <FanNavigation />
      {children}
    </>
  );
}
