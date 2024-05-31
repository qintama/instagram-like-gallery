interface Photo {
    id: string;
    width: number;
    height: number;
    url: string;
    download_url: string;
}

export async function GET() {
    const page = Math.floor(Math.random() * 100) + 1;
    
    const res = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=9`);
    const photosList: Photo[] = await res.json();

    return Response.json(photosList.map(photo => {
        return {
            ...photo,
            url: `${photo.download_url.replace(/\/\d+\/\d+$/, `/${309}`)}.webp`,
        };
    }));
}