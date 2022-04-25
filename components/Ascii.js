import * as React from 'react';

const TYPE_MAP = {
  worm: (
    <svg
      width="200"
      height="125"
      viewBox="0 0 200 125"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1107_2832)">
        <rect width="200" height="125" fill="none" />
        <path
          d="M62.7732 55.8872H75.3255V54.0246H62.7732V55.8872ZM75.3278 55.8872H87.8801V54.0246H75.3278V55.8872ZM87.8825 55.8872H100.435V54.0246H87.8825V55.8872ZM100.437 55.8872H112.989V54.0246H100.437V55.8872ZM60.4021 57.6133H58.2763L52.567 75.3687H54.6928L60.4021 57.6133ZM75.3278 76.8872H87.8801V75.0246H75.3278V76.8872ZM87.8825 76.8872H100.435V75.0246H87.8825V76.8872ZM123.175 75.3687L117.466 57.6133H115.34L121.05 75.3687H123.175ZM12.5546 96.8872H25.1069V95.0246H12.5546V96.8872ZM25.1093 96.8872H37.6615V95.0246H25.1093V96.8872ZM47.8475 77.6133H45.7217L40.0124 95.3687H42.1382L47.8475 77.6133ZM72.9567 77.6133H70.8309L65.1217 95.3687H67.2475L72.9567 77.6133ZM110.621 95.3687L104.911 77.6133H102.786L108.495 95.3687H110.621ZM135.73 95.3687L130.021 77.6133H127.895L133.604 95.3687H135.73ZM138.101 96.8872H150.653V95.0246H138.101V96.8872ZM150.656 96.8872H163.208V95.0246H150.656V96.8872ZM163.21 96.8872H175.763V95.0246H163.21V96.8872ZM175.765 96.8872H188.317V95.0246H175.765V96.8872ZM10.4872 115.66C7.67308 113.453 6.31662 110.902 6.31662 107.461C6.31662 103.978 7.67308 101.488 10.467 99.2815L9.04978 98.1679C5.79024 100.172 3.96814 103.735 3.96814 107.461C3.96814 111.145 5.81048 114.769 9.00929 116.834L10.4872 115.66ZM18.8308 114.243C21.7056 114.243 23.7505 112.259 23.7505 108.939C23.7505 105.618 21.7056 103.634 18.8308 103.634C15.9559 103.634 13.9111 105.618 13.9111 108.939C13.9111 112.218 15.9559 114.243 18.8308 114.243ZM18.8308 112.38C17.2921 112.38 16.3811 111.145 16.3811 108.939C16.3811 106.732 17.2921 105.497 18.8308 105.497C20.3694 105.497 21.2805 106.752 21.2805 108.939C21.2805 111.145 20.3694 112.38 18.8308 112.38ZM25.1093 117.887H37.6615V116.025H25.1093V117.887ZM37.6639 117.887H50.2162V116.025H37.6639V117.887ZM60.4021 98.6133H58.2763L52.567 116.369H54.6928L60.4021 98.6133ZM123.175 116.369L117.466 98.6133H115.34L121.05 116.369H123.175ZM125.546 117.887H138.099V116.025H125.546V117.887ZM138.101 117.887H150.653V116.025H138.101V117.887ZM157.883 116.369V98.6133H155.98V116.369H157.883ZM170.438 116.369V98.6133H168.535V116.369H170.438ZM175.765 117.887H188.317V116.025H175.765V117.887ZM191.863 116.834C195.082 114.769 196.904 111.145 196.904 107.461C196.904 103.735 195.082 100.172 191.822 98.1679L190.405 99.2815C193.199 101.488 194.555 103.978 194.555 107.461C194.555 110.902 193.199 113.453 190.405 115.66L191.863 116.834Z"
          fill="var(--dark)"
        />
      </g>
      <defs>
        <clipPath id="clip0_1107_2832">
          <rect width="200" height="125" fill="none" />
        </clipPath>
      </defs>
    </svg>
  ),
  pencil: (
    <svg
      width="200"
      height="125"
      viewBox="0 0 200 125"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1107_2841)">
        <rect width="200" height="125" fill="none" />
        <path
          d="M40.9835 76.2184L51.8541 69.9422L50.9228 68.3292L40.0522 74.6053L40.9835 76.2184ZM51.3301 70.2447L62.2007 63.9686L61.2694 62.3555L50.3988 68.6317L51.3301 70.2447ZM61.6768 64.2711L72.5474 57.995L71.6161 56.3819L60.7455 62.658L61.6768 64.2711ZM72.0234 58.2975L82.894 52.0213L81.9627 50.4083L71.0921 56.6844L72.0234 58.2975ZM82.3701 52.3238L93.2406 46.0477L92.3093 44.4346L81.4388 50.7108L82.3701 52.3238ZM92.7167 46.3502L103.587 40.0741L102.656 38.461L91.7854 44.7371L92.7167 46.3502ZM123.757 28.4293L134.627 22.1531L133.696 20.5401L122.825 26.8162L123.757 28.4293ZM24.2261 96.8501L16.4861 97.8589L21.2297 91.6603L20.2377 89.942L14.0594 98.2313L14.9705 99.8093L25.2384 98.6034L24.2261 96.8501ZM27.9725 81.1047L26.1315 82.1676L30.0649 100.399L31.9058 99.336L27.9725 81.1047ZM39.1369 96.9144L50.0074 90.6383L49.0761 89.0253L38.2056 95.3014L39.1369 96.9144ZM49.4835 90.9408L60.3541 84.6647L59.4228 83.0516L48.5522 89.3278L49.4835 90.9408ZM59.8301 84.9672L70.7007 78.691L69.7694 77.078L58.8988 83.3541L59.8301 84.9672ZM70.1768 78.9935L81.0474 72.7174L80.1161 71.1043L69.2455 77.3805L70.1768 78.9935ZM80.5234 73.0199L91.394 66.7438L90.4627 65.1307L79.5921 71.4068L80.5234 73.0199ZM90.8701 67.0463L101.741 60.7701L100.809 59.1571L89.9388 65.4332L90.8701 67.0463ZM101.217 61.0726L112.087 54.7965L111.156 53.1834L100.285 59.4596L101.217 61.0726ZM117.063 50.1702L108.186 34.7935L106.538 35.7451L115.415 51.1217L117.063 50.1702ZM123.553 46.4235L114.675 31.0469L113.027 31.9985L121.905 47.3751L123.553 46.4235ZM129.691 42.8794L120.814 27.5028L119.166 28.4543L128.043 43.8309L129.691 42.8794ZM134.538 41.8346L145.409 35.5584L144.477 33.9454L133.607 40.2215L134.538 41.8346ZM150.385 30.9321L141.507 15.5555L139.859 16.507L148.737 31.8836L150.385 30.9321Z"
          fill="var(--dark)"
        />
        <path
          d="M1.84033 117.999H14.3926V116.136H1.84033V117.999ZM15.8122 117.999H28.3644V116.136H15.8122V117.999ZM29.784 117.999H42.3363V116.136H29.784V117.999ZM43.7558 117.999H56.3081V116.136H43.7558V117.999ZM57.7277 117.999H70.2799V116.136H57.7277V117.999ZM71.6995 117.999H84.2518V116.136H71.6995V117.999ZM85.6713 117.999H98.2236V116.136H85.6713V117.999ZM99.6432 117.999H112.195V116.136H99.6432V117.999ZM113.615 117.999H126.167V116.136H113.615V117.999Z"
          fill="var(--dark)"
        />
      </g>
      <defs>
        <clipPath id="clip0_1107_2841">
          <rect width="200" height="125" fill="none" />
        </clipPath>
      </defs>
    </svg>
  ),
  puzzle: (
    <svg
      width="200"
      height="125"
      viewBox="0 0 200 125"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1107_2843)">
        <rect width="200" height="125" fill="none" />
        <path
          d="M37.6639 44.6108H50.2162V42.7482H37.6639V44.6108ZM57.4462 43.0924V25.337H55.5432V43.0924H57.4462ZM82.5555 43.0924V25.337H80.6524V43.0924H82.5555ZM87.8825 44.6108H100.435V42.7482H87.8825V44.6108ZM100.437 44.6108H112.989V42.7482H100.437V44.6108ZM12.5546 62.6108H25.1069V60.7482H12.5546V62.6108ZM32.337 61.0924V43.337H30.4339V61.0924H32.337ZM100.437 62.6108H112.989V60.7482H100.437V62.6108ZM120.219 61.0924V43.337H118.316V61.0924H120.219ZM10.4872 79.3838C7.67308 77.177 6.31662 74.6261 6.31662 71.1843C6.31662 67.7021 7.67308 65.2119 10.467 63.0051L9.04978 61.8916C5.79024 63.8959 3.96814 67.4591 3.96814 71.1843C3.96814 74.869 5.81048 78.493 9.00929 80.558L10.4872 79.3838ZM12.5546 81.6108H25.1069V79.7482H12.5546V81.6108ZM98.3697 79.3838C95.5556 77.177 94.1991 74.6261 94.1991 71.1843C94.1991 67.7021 95.5556 65.2119 98.3494 63.0051L96.9323 61.8916C93.6727 63.8959 91.8506 67.4591 91.8506 71.1843C91.8506 74.869 93.693 78.493 96.8918 80.558L98.3697 79.3838ZM100.437 81.6108H112.989V79.7482H100.437V81.6108ZM32.337 98.0924V80.337H30.4339V98.0924H32.337ZM120.219 98.0924V80.337H118.316V98.0924H120.219ZM32.337 116.092V98.337H30.4339V116.092H32.337ZM37.6639 117.611H50.2162V115.748H37.6639V117.611ZM57.4462 116.092V98.337H55.5432V116.092H57.4462ZM82.5555 116.092V98.337H80.6524V116.092H82.5555ZM87.8825 117.611H100.435V115.748H87.8825V117.611ZM100.437 117.611H112.989V115.748H100.437V117.611ZM120.219 116.092V98.337H118.316V116.092H120.219Z"
          fill="var(--dark)"
        />
        <path
          d="M60.4817 94.9482C62.6885 92.134 65.2394 90.7776 68.6812 90.7776C72.1634 90.7776 74.6536 92.134 76.8604 94.9279L77.9739 93.5107C75.9696 90.2512 72.4064 88.4291 68.6812 88.4291C64.9965 88.4291 61.3725 90.2714 59.3075 93.4702L60.4817 94.9482Z"
          fill="var(--dark)"
        />
        <path
          d="M60.4817 19.4872C62.6885 16.6731 65.2394 15.3166 68.6812 15.3166C72.1634 15.3166 74.6536 16.6731 76.8604 19.467L77.9739 18.0498C75.9696 14.7902 72.4064 12.9681 68.6812 12.9681C64.9965 12.9681 61.3725 14.8105 59.3075 18.0093L60.4817 19.4872Z"
          fill="var(--dark)"
        />
      </g>
      <defs>
        <clipPath id="clip0_1107_2843">
          <rect width="200" height="125" fill="none" />
        </clipPath>
      </defs>
    </svg>
  )
};

export function Ascii({ type }) {
  return (
    <div>
      {TYPE_MAP[type]}
      <style jsx>
        {`
          div {
            position: relative;
            display: flex;
            align-items: end;
            min-height: 80px;
          }

          div :global(svg) {
            width: 105px;
          }

          @media screen and (max-width: 1000px) {
            div {
              min-height: 0px;
            }
          }

          @media screen and (max-width: 600px) {
            div :global(svg) {
              width: 95px;
            }
          }
        `}
      </style>
    </div>
  );
}
