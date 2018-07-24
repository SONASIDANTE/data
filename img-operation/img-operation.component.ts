import { Component, OnInit, Renderer2, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
@Component({
  selector: 'app-img-operation',
  templateUrl: './img-operation.component.html',
  styleUrls: ['./img-operation.component.css', './../../../../../assets/css/dialog.css']
})
export class ImgOperationComponent implements OnInit, AfterViewInit {
  imgInfo = {
    width: 600,
    translate: 0,
    height: 400,
    scale: 0,
    rotate: 0,
    canMove: false,
    top: 0,
    left: 0,
    m_top: 0,
    m_left: 0,
    imgMove: null,
    imgScroll: null,
  }
  imgListen = null;
  imgSrc = '';
  imgName = '';
  @ViewChild('img')
  img: ElementRef;
  showImg = false;
  downLink = '';
  canvas;
  constructor(public renderer: Renderer2, private http: HttpClient) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    // console.dir(this.imgop);
    // this.listenImg();
  }
  beforeHide() {
    this.imgInfo.imgScroll = null;
  }
  // 初始化img标签监听
  listenImg(imgop) {
    if (!this.imgListen) {
      this.imgListen = this.renderer.listen(imgop, 'click', (event) => {
        if (event.target.localName === 'img') {
          this.imgSrc = event.target.currentSrc;
          this.downloadImg(event.target.naturalWidth, event.target.naturalHeight);
          this.imgName = this.imgSrc.substring(this.imgSrc.lastIndexOf('/') + 1, this.imgSrc.length);
          this.imgInfo.width = Math.min(event.target.naturalWidth, 600);
          this.imgInfo.scale = event.target.naturalHeight / event.target.naturalWidth;
          this.imgInfo.height = this.imgInfo.width *  this.imgInfo.scale;
          this.imgInfo.rotate = 0;
          this.showImg = true;
          this.imgInfo.m_top = 0;
          this.imgInfo.m_left = 0;
          this.renderer.listen(this.img.nativeElement, 'mousedown', (ev) => {
            // console.log('down', ev);
            this.imgInfo.top = Number(this.img.nativeElement.style.top.replace('px', ''));
            this.imgInfo.left = Number(this.img.nativeElement.style.left.replace('px', ''));
            this.imgInfo.m_top = ev.clientY;
            this.imgInfo.m_left = ev.clientX;
            this.imgInfo.canMove = true;
            this.renderer.listen(window, 'mouseup', (evt) => {
              this.imgInfo.canMove = false;
              this.imgInfo.imgMove = null;
            });
            this.imgInfo.imgMove = this.renderer.listen(this.img.nativeElement, 'mousemove', (evt) => {
              if (this.imgInfo.canMove) {
                this.renderer.setStyle(this.img.nativeElement, 'top', this.imgInfo.top + evt.clientY - this.imgInfo.m_top + 'px')
                this.renderer.setStyle(this.img.nativeElement, 'left', this.imgInfo.left + evt.clientX - this.imgInfo.m_left + 'px')
              }
              return false;
            });
          });

          this.imgInfo.imgScroll = this.renderer.listen(this.img.nativeElement.parentElement, 'mousewheel', (ev) => {
            if (ev.deltaY < 0) {
              this.zoomIn();
            } else {
              this.zoomOut();
            }
          })
        }
      })
    }
  }
//  缩小
  zoomOut() {
    if (this.imgInfo.width <= 50) {
      return;
    }
    this.imgInfo.width -= 50;
    this.imgInfo.height = this.imgInfo.width *  this.imgInfo.scale;
  }
  //  放大
  zoomIn() {
    this.imgInfo.width += 50;
    this.imgInfo.height = this.imgInfo.width *  this.imgInfo.scale;
  }
//  旋转
  rotateImg() {
    this.imgInfo.rotate += 90;
    // [this.imgInfo.width, this.imgInfo.height] = [this.imgInfo.height, this.imgInfo.width];
  }

//  下载
  downloadImg(w, h) {
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
    }
    // document.body.appendChild(this.canvas);
    let ctx = this.canvas.getContext('2d');
    let img = new Image();
    img.src = this.imgSrc;
    img.setAttribute('crossOrigin', 'anonymous');
    this.canvas.width = w;
    this.canvas.height = h;
    img.onload = () => {
      ctx.drawImage(img, 0 , 0, w, h);
      this.downLink = this.canvas.toDataURL();
    };
    // this.downLink = this.canvas.toDataURL();
    // console.log(this.downLink);
  }
}
