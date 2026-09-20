import { MdArrowForward, MdFormatListBulleted } from 'react-icons/md';

type ContentsItem = {
  label: string;
  target: string;
};

const ContentsCard = ({ items }: { items: ContentsItem[] }) => (
  <nav
    aria-label="Portfolio contents"
    className="contents-card card shadow-lg card-sm bg-base-100"
  >
    <div className="contents-card-body card-body p-6 sm:p-7">
      <div className="contents-card-header flex items-center gap-3 mb-5">
        <div className="contents-card-icon flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
          <MdFormatListBulleted className="text-xl text-primary" />
        </div>
        <div>
          <p className="contents-card-eyebrow">Explore the portfolio</p>
          <h2 className="card-title text-base-content">Contents</h2>
          <p className="contents-card-kicker">Jump to a section</p>
        </div>
      </div>
      <div className="contents-card-links grid grid-cols-1 sm:grid-cols-3 gap-2">
        {items.map((item, index) => (
          <a
            key={item.target}
            href={item.target}
            className={`contents-card-link group flex items-center justify-between gap-2 rounded-lg border border-base-300 px-3 py-2 text-sm text-base-content ${
              item.target === '#research-work' ? 'contents-card-featured' : ''
            }`}
            style={{ '--contents-delay': `${index * 55}ms` } as React.CSSProperties}
          >
            <span>{item.label}</span>
            <MdArrowForward className="shrink-0 transition-transform group-hover:translate-x-1" />
          </a>
        ))}
      </div>
    </div>
  </nav>
);

export default ContentsCard;