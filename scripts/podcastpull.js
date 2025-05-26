const podcastStub = { date: "", title: "", description: "", url: "", id: "" };
function getPodcastDataXML(inputUrl, podcastName) {
  return new Promise((resolve, reject) => {
    const url = "https://rss.dw.com/xml/podcast_inside-europe";
    const request = new XMLHttpRequest();
    request.open("GET", inputUrl);
    // request.addEventListener("error", function (error) {
    //   alert("Radio Fetch Issue:", error);
    //   console.log("Radio Fetch Issue:", error);
    // });
    request.send();
    request.onload = function () {
      //console.log(request.response)
      const podcastList = parsePodcastXML(request.response, podcastName);
      resolve(podcastList);
    };
  });
}

function parsePodcastXML(data, podcastName) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(data, "application/xml");
  const nodes = xmlDoc.getElementsByTagName("item");
  const pubDate = xmlDoc.getElementsByTagName("pubDate");

  const delta = pubDate.length - nodes.length;
  console.log("delta", delta);
  //console.log(nodes)
  const podcasts = [];

  // if ("inside_europe" === podcastName) {
  //   for (let i = 0; i < nodes.length; i++) {
  //     //console.log( xmlDoc.getElementsByTagName("item")[i])
  //     const date =
  //       xmlDoc.getElementsByTagName("item")[i].childNodes[3].lastChild
  //         .nodeValue;
  //     const title =
  //       xmlDoc.getElementsByTagName("item")[i].childNodes[5].lastChild
  //         .nodeValue;
  //     const description =
  //       xmlDoc.getElementsByTagName("item")[i].childNodes[9].lastChild
  //         .nodeValue;
  //     const url =
  //       xmlDoc.getElementsByTagName("item")[i].childNodes[19].attributes["url"]
  //         .nodeValue;
  //     const newPod = { ...podcastStub };

  //     newPod.date = date;
  //     newPod.description = description;
  //     newPod.title = title;
  //     newPod.url = url;
  //     newPod.id = `${podcastName}-${i}`;
  //     //console.log(url)
  //     podcasts.push(newPod);
  //   }
  // } else {
  for (let i = 0; i < nodes.length; i++) {
    const date =
      xmlDoc.getElementsByTagName("pubDate")[i + delta]?.lastChild?.nodeValue;
    const title =
      xmlDoc.getElementsByTagName("title")[i + 2].lastChild.nodeValue;
    const description =
      xmlDoc.getElementsByTagName("description")[i + 1].lastChild.nodeValue;
    const url =
      xmlDoc.getElementsByTagName("enclosure")[i].attributes["url"].nodeValue;
    const newPod = { ...podcastStub };

    newPod.date = date;
    newPod.description = description;
    newPod.title = title;
    newPod.url = url;
    newPod.id = `${podcastName}-${i}`;
    //console.log(url);
    podcasts.push(newPod);
  }
  //}

  return podcasts;
}

function xmlParserReturn(text) {
  parser = new DOMParser();
  return parser.parseFromString(text, "text/xml");
}
