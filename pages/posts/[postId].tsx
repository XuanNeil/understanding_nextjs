
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";

interface IPostList{
    id: string;
    title: string;
    description: string;
    author: string;
}


export interface IPostPageProps{
    post: IPostList
}

export default function PostDetailPage(props: IPostPageProps){

    const router = useRouter();
    
    return (
        <div>
            <h1>Post Detail Page</h1>
            <p>{JSON.stringify(router.query)}</p>
            
            <p>{props.post.id}</p>
            <p>{props.post.title}</p>
            <p>{props.post.author}</p>
            <p>{props.post.description}</p>
        </div>
    ); 
}

/**
 * getStaticPaths() được gọi đúng 1 lần
 * getStaticProps() chạy bấy nhiêu lần tùy thuộc vào params object return về bao nhiêu lần của getStaticPaths();
 * ứng với mỗi trả về trong getStaticProps() sẻ reaturn về 1 file có param và 1 file json tương ứng.
 */

export const getStaticPaths: GetStaticPaths = async() => {

    console.log(`GET STATIC PATHS`);
    
    const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1');
    const {data} = await response.json();

    const listPostId = data.map((post: IPostList)=> ({
        params: {postId: post.id}
    }))
    return {
        paths: listPostId,
        fallback: false
    }
}


export const getStaticProps: GetStaticProps<IPostPageProps> = async (context: GetStaticPropsContext) => {
    // server-side
    // build-time
    const postId = context.params?.postId;

    console.log('GET STATIC PROPS', postId);

    if (!postId) return {notFound: true}

    const response = await fetch(`https://js-post-api.herokuapp.com/api/posts/${postId}`);
    const {data} = await response.json();

    
    // convert data

    return {
        props: {
            post: data
        }
    }
}