import moment from "moment"
import {DEFAULT_IMG_URL} from "../../common/config";

export default {
    methods: {
        getPostImages(post){
            if(post.better_featured_image){
                var images = post.better_featured_image.media_details.sizes;
                var max_size = Object.keys(images).pop()
                return images[max_size].source_url
            }else{
                return DEFAULT_IMG_URL
            }
        },
        getHumanDate(date,format = "LLL"){
            return moment(date).locale('ru').format(format)
        },
    }
}