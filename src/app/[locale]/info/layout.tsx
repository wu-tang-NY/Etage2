import InfoLayout from './info-layout';

export default function InfoLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <InfoLayout>{children}</InfoLayout>;
}

