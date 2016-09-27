var MoFo = function (elem) {
	var mf = this;

	mf.preventDefault = function (e) {
		e.preventDefault();
	}

	mf.stopPropagation = function (e) {
		e.stopPropagation();
	}

	mf.setScroll = function (e) {
		e.stopPropagation();
		if(mf.scroller.scrollTop <= 0) {
			mf.scroller.scrollTop = 1;
		} else 
		if (mr.scroller.scrollTop >= mf.scrollHeight - mf.containerHeight) {
			mf.scroller.scrollTop -= 1;
		}
	}

	mf.update = function () {
		mf.scrollHeight = mf.scroller.scrollHeight;
		mf.containerHeight = mf.scroller.getClientBoundingRect().height();
		mf.overflow = mf.scrollHeight > mf.containerHeight;
		if(mf.overflow) {
			document.documentElement.classList.add("mofo-noScroll");
			mf.scroller.addEventListener("touchmove", mf.stopPropagation);
			mf.scroller.addEventListener("touchstart", mf.adjustScroll);
		} else {
			document.documentElement.classList.remove("mofo-noScroll");
			mf.scroller.removeEventListener("touchmove", mf.stopPropagation);
			mf.scroller.removeEventListener("touchstart", mf.adjustScroll);
		}
	}

	mf.destroy = function () {
		document.documentElement.removeEventListener("touchmove", mf.preventDefault);
		mf.scroller.removeEventListener("touchmove", mf.stopPropagation);
		mf.scroller.removeEventListener("touchstart", mf.adjustScroll);
	}

	mf.scroller = elem;

	mf.update();

	document.documentElement.addEventListener("touchmove", mf.preventDefault);
}