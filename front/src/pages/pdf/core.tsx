import { Spinner } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import {PdfLoader, PdfHighlighter, AreaHighlight, Highlight, Tip, IHighlight, Popup, NewHighlight} from 'react-pdf-highlighter'
import { test_highlights } from './highlight';
import { Sidebar } from './sidebar';
import './comp.css'


const parseIdFromHash = () => {
  const id = document.location.hash.slice("#highlight-".length);
  console.log(id)
  return id
}

const resetHash = () => {
  console.log('reset')
  document.location.hash = "";
};

const HighlightPopup = ({
  comment,
}: {
  comment: { text: string; emoji: string };
}) =>
  comment.text ? (
    <div className="Highlight__popup">
      {comment.emoji} {comment.text}
    </div>
  ) : null;


const getNextId = () => String(Math.random()).slice(2);



export function PdfReader(){
  const [url] = useState('/static/1970_01.pdf')

  const [highlights,setHighlights] = useState<IHighlight[]>(test_highlights)


  let scrollViewerTo = (highlight: IHighlight) => {}

  const getHighlightById = (id: string) => {
    const higlight = highlights.find((highlight) => highlight.id === id);
    console.log(higlight)
    return higlight
  }

  const scrollToHighlightFromHash = useCallback(() => {
    const highlight = getHighlightById(parseIdFromHash());
    console.log(highlight)

    if (highlight) {
      console.log('Scroll');
      scrollViewerTo(highlight);
    }
  },[scrollViewerTo,getHighlightById]);

  const resetHighlights = () => {setHighlights([])}


  const addHighlight = (highlight: NewHighlight) => {
    setHighlights(
      [{ ...highlight, id: getNextId() }, ...highlights],
    );
  }

    const updateHighlight = (highlightId: string, position: Object, content: Object) => {
      console.log("Updating highlight", highlightId, position, content);
  
      setHighlights(highlights.map((h) => {
          const {
            id,
            position: originalPosition,
            content: originalContent,
            ...rest
          } = h;
          return id === highlightId
            ? {
                id,
                position: { ...originalPosition, ...position },
                content: { ...originalContent, ...content },
                ...rest,
              }
            : h;
        }),
      );
    }

    useEffect(() => {
      window.addEventListener(
        "hashchange",
        scrollToHighlightFromHash,
        false
      );
  }, [scrollToHighlightFromHash])

    return (
    <div className="App" style={{ display: "flex", height: "100vh" }}>
      <Sidebar
          highlights={highlights}
          resetHighlights={resetHighlights}
          toggleDocument={()=>()=>{}}
      />
      <div
        style={{
          height: "100vh",
          width: "75vw",
          position: "relative",
        }}
      >
        <PdfLoader url={url} beforeLoad={<Spinner />}>
          {(pdfDocument) => (
            <PdfHighlighter
              pdfDocument={pdfDocument}
              enableAreaSelection={(event) => event.altKey}
              onScrollChange={resetHash}
              // pdfScaleValue="page-width"
              scrollRef={(scrollTo) => {
                console.log('Provide'); 
                scrollViewerTo = scrollTo;
                scrollToHighlightFromHash()
              }}
              onSelectionFinished={(
                position,
                content,
                hideTipAndSelection,
                transformSelection
              ) => (
                <Tip
                  onOpen={transformSelection}
                  onConfirm={(comment) => {
                    addHighlight({ content, position, comment });
                    hideTipAndSelection();
                  }}
                />
              )}
              highlightTransform={(
                highlight,
                index,
                setTip,
                hideTip,
                viewportToScaled,
                screenshot,
                isScrolledTo
              ) => {
                const isTextHighlight = !Boolean(
                  highlight.content && highlight.content.image
                );

                const component = isTextHighlight ? (
                  <Highlight
                    isScrolledTo={isScrolledTo}
                    position={highlight.position}
                    comment={highlight.comment}
                  />
                ) : (
                  <AreaHighlight
                    isScrolledTo={isScrolledTo}
                    highlight={highlight}
                    onChange={(boundingRect) => {
                      updateHighlight(
                        highlight.id,
                        { boundingRect: viewportToScaled(boundingRect) },
                        { image: screenshot(boundingRect) }
                      );
                    }}
                  />
                );

                return (
                  <Popup
                    popupContent={<HighlightPopup {...highlight} />}
                    onMouseOver={(popupContent) =>
                      setTip(highlight, (highlight) => popupContent)
                    }
                    onMouseOut={hideTip}
                    key={index}
                    children={component}
                  />
                );
              }}
              highlights={highlights}
            />
          )}
        </PdfLoader>
      </div>
    </div>
  );
}
