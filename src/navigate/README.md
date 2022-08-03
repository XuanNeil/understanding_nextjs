## Navigation in NextJs

1. Navigation between pages with next/link.
2. Navigation to a page programmatically using router.push().
3. How prefetching works


I. Navigation between pages with next/link.

```
    import Link from 'next/link'
    
    function HomePage(){
        return (
            <Link href="/about">
                <a>About Us</a>
            </Link>
        )
    }
```

<Link> props:

    - 1. href: Required. the path or URL to navigate to.
    - 2. prefetch: default true. Prefetch the page in the background.

Lưu ý:

    - Khi chuyển trang, NextJS là client-side-routing, chỉ là get thêm 1 file js về và sau đó chạy file js đó để chuyển đổi qua trang mong muốn thôi.
    - Nó không phải là full-page-reload (tải lại toàn bộ trang đó).
Reference:
https://nextjs.org/docs/api-reference/next/link


II. Navigation to a page programmatically using router.push().
```
    import {useRouter} from 'next/router';
    
    function App(){
        const router = useRouter();
    
    function handleSumbit(){
        router.push('pathname');
        //or using options object
        router.push({
            pathname: '/pathname',
            query: {
                postId: 1,
                ref: 'social',
            },
        })
      }
      
      return (...)
    }
```
Reference: https://nextjs.org/docs/api-reference/next/router

III. How prefetching works?

    - Prefetch the page in the background for faster client-side transitions (Tìm nạp trước trang trong nền để chuyển đổi phía client nhanh hơn).
    Note:
     1. chỉ prefetch in the viewport
     2. chỉ bật lên ở production mode.
     3. truong hop slow network cung sẽ bị tắt hoặc khi user have `Save-Data` turned on.
     4. Nextjs chỉ tìm nạp js, chứ không thực thi nó.

Reference: https://web.dev/route-prefetching-in-nextjs/