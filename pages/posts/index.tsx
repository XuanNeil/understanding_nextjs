import {GetStaticProps, GetStaticPropsContext} from "next";
import Link from "next/link";

interface IPostList{
    id: string;
    title: string;
}

export interface IPostListPageProps {
    posts: IPostList[]
}

export default function PostListPage({posts}: IPostListPageProps){
    
    return (
        <div><h1>Post List</h1>
            <ul>
                {posts.map(({id, title}) =>(
                    <li key={id}>
                        <Link href={`posts/${id}`}><a>{title}</a></Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export const getStaticProps: GetStaticProps<IPostListPageProps> = async (context: GetStaticPropsContext) => {
    // server-side
    // build-time
    console.log('static props');
    const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1');
    const {data} = await response.json();

    // convert data
    const convertData = data.map((post: IPostList)=> ({
        id: post.id,
        title: post.title,
        })
    )

    return {
        props: {
            posts: convertData
        }
    }
}
