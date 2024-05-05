import { IHighlight } from "react-pdf-highlighter"


export const test_highlights: IHighlight[] =  [
    {
        content: {
          text: "Первая заметка",
        },
        position: {
          boundingRect: {
            x1: 255.73419189453125,
            y1: 139.140625,
            x2: 574.372314453125,
            y2: 165.140625,
            width: 809.9999999999999,
            height: 1200,
          },
          rects: [
            {
              x1: 255.73419189453125,
              y1: 139.140625,
              x2: 574.372314453125,
              y2: 165.140625,
              width: 809.9999999999999,
              height: 1200,
            },
          ],
          pageNumber: 1,
        },
        comment: {
          text: "Мой комментарий",
          emoji: "🔥",
        },
        id: "8245652131754351",
      },
      {
        content: {
          text: "Заметка на странице 10",
        },
        position: {
          boundingRect: {
            x1: 353.080810546875,
            y1: 346.390625,
            x2: 658.6533203125,
            y2: 363.390625,
            width: 809.9999999999999,
            height: 1200,
          },
          rects: [
            {
              x1: 353.080810546875,
              y1: 346.390625,
              x2: 658.6533203125,
              y2: 363.390625,
              width: 809.9999999999999,
              height: 1200,
            },
          ],
          pageNumber: 10,
        },
        comment: {
          text: "Ого",
          emoji: "",
        },
        id: "812807243318874",
      },
]
