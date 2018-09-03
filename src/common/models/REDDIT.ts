import { __debug } from "__FUNCTIONS/__debug";
const debug = __debug("CONTACT");

export namespace REDDIT {
    export interface ISubredditSearchResult {
        kind: string;
        data: {
            modhash: string;
            dist: number;
            children: ISubredditSearchResultChild[];
        };
    }
}

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
