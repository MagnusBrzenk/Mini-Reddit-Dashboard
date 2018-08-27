import { __debug } from "__FUNCTIONS/__debug";
const debug = __debug("CONTACT");

export namespace REDDIT {
    //
    //
    //
    export interface ISubredditSearchResult {
        kind: string;
        data: {
            modhash: string;
            dist: number;
            children: ISubredditSearchResultChild[];
        };
    }

    export interface IAllPostsSearchResult {
        kind: string;
        data: {
            modhash: string;
            dist: number;
            children: IAllPostsSearchResultChild[];
            after: string;
            before: string | null;
        };
    }

    //Reworking of salient properties of reddit post
    export interface IPost {
        redditId: string;
        title: string;
        link: string | undefined;
        selftext: string;
        imageUrl: string | undefined;
        thumbnailUrl: string | undefined;
        subredditName: string;
        commentPage: string | undefined;
        over_18: boolean;
        redditScore: number;
        videoUrl: string | undefined;
        created: number;
    }
}

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

interface IAllPostsSearchResultChild {
    kind: string;
    data: {
        id: string;
        title: string;
        subreddit: string;
        selftext: string;
        url: string;
        preview: any;
        thumbnail: string;
        permalink: string;
        media: any;
        over_18: boolean;
        score: number;
        created: number;
    };
}

/* AVAILABLE FIELDS FOR IAllPostsSearchResultChild.data */

// approved_at_utc	null
// subreddit	"funny"
// selftext	""
// user_reports	[]
// saved	false
// mod_reason_title	null
// gilded	13
// clicked	false
// title	"Guardians of the Front Page"
// link_flair_richtext	[]
// subreddit_name_prefixed	"r/funny"
// hidden	false
// pwls	6
// link_flair_css_class	""
// downs	0
// thumbnail_height	58
// parent_whitelist_status	"all_ads"
// hide_score	false
// name	"t3_5gn8ru"
// quarantine	false
// link_flair_text_color	"dark"
// author_flair_background_color	null
// subreddit_type	"public"
// ups	283484
// domain	"i.imgur.com"
// media_embed	{}
// thumbnail_width	140
// author_flair_template_id	null
// is_original_content	false
// secure_media	null
// is_reddit_media_domain	false
// is_meta	false
// category	null
// secure_media_embed	{}
// link_flair_text	"Best of 2016 Winner"
// can_mod_post	false
// score	283484
// approved_by	null
// thumbnail	"https://b.thumbs.redditm…g-vk4_KjtnHNlQ-NzkxA.jpg"
// edited	false
// author_flair_css_class	null
// author_flair_richtext	[]
// post_hint	"link"
// content_categories	null
// is_self	false
// mod_note	null
// created	1480988474
// link_flair_type	"text"
// wls	6
// banned_by	null
// author_flair_type	"text"
// contest_mode	false
// selftext_html	null
// likes	null
// suggested_sort	null
// banned_at_utc	null
// view_count	null
// archived	true
// no_follow	false
// is_crosspostable	true
// pinned	false
// over_18	false
// preview	{…}
// media_only	false
// link_flair_template_id	null
// can_gild	true
// spoiler	false
// locked	false
// author_flair_text	null
// visited	false
// num_reports	null
// distinguished	null
// subreddit_id	"t5_2qh33"
// mod_reason_by	null
// removal_reason	null
// link_flair_background_color	""
// id	"5gn8ru"
// report_reasons	null
// author	"iH8myPP"
// num_crossposts	30
// num_comments	5050
// send_replies	true
// mod_reports	[]
// author_flair_text_color	null
// permalink	"/r/funny/comments/5gn8ru…ians_of_the_front_page/"
// whitelist_status	"all_ads"
// stickied	false
// url	"http://i.imgur.com/OOFRJvr.gifv"
// subreddit_subscribers	20527354
// created_utc	1480959674
// media	null
// is_video	false

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

interface ISubredditSearchResultChild {
    kind: string;
    data: {
        display_name: string;
        // ...
    };
}

/* AVAILABLE FIELDS FOR ISubredditSearchResultChild.data */

// suggested_comment_sort	null
// user_flair_background_color	null
// hide_ads	false
// banner_img	""
// public_description	"Cats!"
// user_flair_text	null
// submit_text_html	"&lt;!-- SC_OFF --&gt;&lt…gt;&lt;!-- SC_ON --&gt;"
// user_flair_position	"right"
// user_flair_enabled_in_sr	false
// user_flair_template_id	null
// user_is_banned	null
// community_icon	""
// banner_background_image	""
// original_content_tag_enabled	false
// wiki_enabled	false
// banner_size	null
// show_media	true
// banner_background_color	""
// display_name_prefixed	"r/cat"
// user_is_muted	null
// user_flair_type	"text"
// user_can_flair_in_sr	null
// display_name	"cat"
// header_img	null
// description_html	"&lt;!-- SC_OFF --&gt;&lt…gt;&lt;!-- SC_ON --&gt;"
// title	"cat"
// collapse_deleted_comments	false
// id	"2qnlf"
// user_has_favorited	null
// emojis_custom_size	null
// show_media_preview	true
// over18	false
// public_description_html	"&lt;!-- SC_OFF --&gt;&lt…gt;&lt;!-- SC_ON --&gt;"
// created	1224350834
// allow_videos	true
// spoilers_enabled	true
// icon_size	null
// primary_color	""
// audience_target	""
// all_original_content	false
// notification_level	null
// active_user_count	null
// icon_img	""
// header_title	null
// description	"### [](#h3-blue)\n\n&gt;…hesitate to message us!"
// can_assign_link_flair	false
// submit_text	"Have you looked at the rules?"
// user_flair_text_color	null
// accounts_active	null
// public_traffic	false
// header_size	null
// subscribers	11241
// user_flair_css_class	null
// submit_text_label	"Submit a new question"
// whitelist_status	null
// link_flair_position	""
// user_flair_richtext	[]
// user_sr_flair_enabled	null
// lang	"en"
// user_is_moderator	null
// has_menu_widget	false
// is_enrolled_in_new_modmail	null
// key_color	""
// name	"t5_2qnlf"
// can_assign_user_flair	false
// allow_videogifs	true
// url	"/r/cat/"
// quarantine	false
// wls	null
// created_utc	1224322034
// emojis_enabled	false
// user_is_contributor	null
// submit_link_label	"Submit a new cat"
// allow_discovery	true
// accounts_active_is_fuzzed	false
// advertiser_category	null
// user_sr_theme_enabled	true
// link_flair_enabled	false
// allow_images	true
// videostream_links_count	0
// comment_score_hide_mins	0
// subreddit_type	"public"
// submission_type	"any"
// user_is_subscriber	null
//-----------------------------------------
// after	"t5_2sekm"
// before	null
//-----------------------------------------

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
