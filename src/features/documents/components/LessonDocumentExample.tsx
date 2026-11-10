import { useFullscreenPreview } from '../hooks/useFullscreenPreview';
import { Button, LinkButton } from '../../../components/ui';

const samplePath = 'assets/documents/info4-lesson8-about-me';
const illustrationPath = 'assets/documents/word2013/illustrations/example.svg';
const description =
  'Про мене. Мене звати Максим Коваленко. Мені 9 років. Я навчаюся у 4 класі. Люблю малювати й грати у футбол. Мрію створити власну комп’ютерну гру.';

export function LessonDocumentExample() {
  const { dialogRef, presentationRef, openPreview, closePreview } =
    useFullscreenPreview();

  return (
    <section className="lesson-example" aria-labelledby="lesson-example-title">
      <h4 id="lesson-example-title">Зразок документа «Про мене»</h4>
      <p>
        Коротка розповідь вигаданого учня 4 класу. Відтвори текст і оформлення
        за зразком.
      </p>
      <div className="lesson-example-actions">
        <LinkButton
          small
          href={`${samplePath}.docx`}
          download="Про-мене-зразок-4-клас.docx"
        >
          Завантажити DOCX
        </LinkButton>
        <Button small variant="gray" onClick={openPreview}>
          На весь екран
        </Button>
      </div>
      <img
        className="lesson-example-image"
        src={illustrationPath}
        alt={description}
        width={1280}
        height={840}
        loading="lazy"
      />
      <p className="inf-note">
        Навчальна ілюстрація Word 2013 українською. Arial · текст 16 пт ·
        заголовок 20 пт, напівжирний · вирівнювання ліворуч.
      </p>
      <dialog
        ref={dialogRef}
        className="lesson-example-dialog"
        aria-label="Зразок документа Про мене"
        onCancel={(event) => {
          event.preventDefault();
          closePreview();
        }}
      >
        <div ref={presentationRef} className="lesson-example-presentation">
          <div className="lesson-example-toolbar">
            <span>Зразок «Про мене»</span>
            <Button small variant="gray" onClick={closePreview} autoFocus>
              Закрити · Esc
            </Button>
          </div>
          <img src={illustrationPath} alt={description} />
        </div>
      </dialog>
    </section>
  );
}
