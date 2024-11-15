import S3Gallery from '@/components/S3Gallery';
// import { Card } from '@/components/Card';

export default function GalleryPage() {
  return (
    <div className='z-10 flex flex-col min-w-[90%] justify-center items-center my-4'>
      <h1 className='font-f1 font-extrabold text-[4rem]'>My Certifications</h1>
      <S3Gallery />
    </div>
  );
}
