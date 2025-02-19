import Image from 'next/image';
import Link from 'next/link';
import Category from '../Category';
import Date from '../Date';
import { News } from '@/app/_libs/microcms';

type Props = {
  news: News[];
};

export default function NewsList({ news }: Props) {
  if (news.length === 0) {
    return <p>記事がありません。</p>;
  }
  return (
    <ul className="space-y-8">
      {news.map((article) => (
        <li key={article.id} className="border-b border-gray-200 dark:border-gray-800 pb-8 last:border-none">
          <Link href={`/news/${article.id}`} className="block hover:opacity-80 transition-opacity sm:flex sm:gap-6">
            {article.thumbnail ? (
              <Image
                src={article.thumbnail.url}
                alt=""
                className="w-full h-48 sm:w-48 sm:h-32 object-cover rounded-lg mb-4 sm:mb-0"
                width={article.thumbnail.width}
                height={article.thumbnail.height}
              />
            ) : (
              <Image
                className="w-full h-48 sm:w-48 sm:h-32 object-cover rounded-lg mb-4 sm:mb-0"
                src="/no-image.png"
                alt="No Image"
                width={1200}
                height={630}
              />
            )}
            <dl className="flex-1">
              <dt className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 line-clamp-2">{article.title}</dt>
              <dd className="flex flex-wrap items-center gap-3 sm:gap-4">
                <Category category={article.category} />
                <Date date={article.publishedAt ?? article.createdAt} />
              </dd>
            </dl>
          </Link>
        </li>
      ))}
    </ul>
  );
}
