const podcastStub={"date":"",title:"",description:"",url:"",id:""}
function getPodcastDataXML(inputUrl,podcastName){
    return new Promise((resolve,reject)=>{
        const url= "https://rss.dw.com/xml/podcast_inside-europe"
        const request = new XMLHttpRequest();
        request.open("GET",url)
        request.onload=function(){
            //console.log(request.response)
            const podcastList=parsePodcastXML(request.response,podcastName)
            resolve(podcastList) 
        }
        request.send()
    })


}

function parsePodcastXML(data,podcastName){
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "application/xml");
    const nodes =xmlDoc.getElementsByTagName("item")
    //console.log(nodes)
    const podcasts=[]
    for(let i=0;i<nodes.length;i++){
        console.log( xmlDoc.getElementsByTagName("item")[i])
        const date = xmlDoc.getElementsByTagName("item")[i].childNodes[3].lastChild.nodeValue
        const title = xmlDoc.getElementsByTagName("item")[i].childNodes[5].lastChild.nodeValue
        const description = xmlDoc.getElementsByTagName("item")[i].childNodes[9].lastChild.nodeValue
        const url = xmlDoc.getElementsByTagName("item")[i].childNodes[19].attributes["url"].nodeValue
        const newPod = {...podcastStub}

        newPod.date=date
        newPod.description=description
        newPod.title=title
        newPod.url=url
        newPod.id=`${podcastName}-${i}`
        //console.log(url)
        podcasts.push(newPod)
    }
    return podcasts
}

function xmlParserReturn(text)
{
  parser = new DOMParser();
  return parser.parseFromString(text,"text/xml");
}