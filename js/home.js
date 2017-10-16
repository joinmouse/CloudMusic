$(function(){
  //生成推荐歌单
  $.get('//owf5g9dnv.bkt.clouddn.com/recommendList.json').then(function(res){
    let recommendList = res
    let $recommendList = $('.recommend-playlists')
    let $ul = $('<ul></ul>')
    console.log(recommendList)
    recommendList.map(function(e){
      let $li = `
        <li data-rId=${e.rId}>
          <span class="view-time">
            <svg class="icon headphone">
                <use xlink:href="#icon-headphone"></use>
            </svg>
            <span class="views">${e.rPlayTimes}</span>
          </span>
          <img src="${e.rCoverUrl}" alt="">
          <p class="playlists-info">${e.rTitle}</p>
        </li>`
        console.log(e.rPlayTimes)
      $ul.append($li)
    })
    $recommendList.append($ul)
    $recommendList.find('ul').on('click','li',function(e){
      let rid = $(e.currentTarget).attr('data-rId')
      window.location.href = `./playlist.html?rid=${rid}`
    })
  })

  //生成最新音乐
  $.get('//owf5g9dnv.bkt.clouddn.com/songsDB.json',function(res){
    let newSongs = res
    let $latestMusic = $('.latest-music')
    let $musicList = $('<ol></ol>')
    newSongs.forEach((music) => {
      let $li = $(`
        <li>
          <div class="song">
            <h3 class="song-name">${music.songName}</h3>
            <p class="song-info">  
              ${music.songAuthor} - ${music.album}
            </p>
          </div>
          <a class="play-btn" href="#">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-play"></use>
              </svg>
          </a>
        </li>
      `)
      //sq超清标记
      if(music.sq === true){
        $li.find('.song-info').prepend(`
          <svg class="icon sq" aria-hidden="true">
            <use xlink:href="#icon-sq"></use>
          </svg>
        `)
      }
      $musicList.append($li)
    })

    $latestMusic.append($musicList).find('.loading').remove()
    $musicList.on('click','li',function(){
      let index = $(this).index()
      window.location.href = `./play.html?id=${index}`
    })
  })

  //tab切换
  $('.nav').on('click','.tab-header>li',function(e){
    let $li = $(e.currentTarget)
    let index = $li.index()    
    $li.addClass('active').siblings().removeClass('active')
    $li.trigger('tabSwitch',index)
    $('.tab-content > li').eq(index).addClass('active').siblings().removeClass('active')
  })
})