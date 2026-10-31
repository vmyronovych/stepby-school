import type { Topic } from '../../../types';
import { Button, Card } from '../../../components/ui';

type Material = NonNullable<Topic['materials']>[number];
const materialIcons: Record<string, string> = {
  video: '🎬',
  text: '📄',
  test: '✅',
};

function MaterialItem({
  material,
  onOpen,
}: {
  material: Material;
  onOpen: () => void;
}) {
  const label =
    material.type === 'video'
      ? 'Відеоурок'
      : material.type === 'test'
        ? 'Інтерактивний тест'
        : 'Текстовий конспект';
  return (
    <div className="list-item">
      <div className="ic" style={{ background: 'var(--primary-l)' }}>
        {materialIcons[material.type] || '📄'}
      </div>
      <div className="txt">
        <b>{material.title}</b>
        <small>{label}</small>
      </div>
      <Button variant="ghost" small onClick={onOpen}>
        Відкрити
      </Button>
    </div>
  );
}

export function TopicMaterials({
  materials = [],
  onOpen,
}: {
  materials?: Material[];
  onOpen: () => void;
}) {
  if (!materials.length) return null;
  return (
    <>
      <div className="section-title">📚 Навчальні матеріали</div>
      <Card>
        {materials.map((material, index) => (
          <MaterialItem key={index} material={material} onOpen={onOpen} />
        ))}
      </Card>
    </>
  );
}
