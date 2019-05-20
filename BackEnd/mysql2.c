use buy_helper;

create table user(
    openid varchar(30),
    nickname varchar(20),
    avatarUrl text,
    gender  varchar(1),
    school  varchar(30),
    wechat  varchar(50),
    status  int,	
    stars   int, 
    registe_time	datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    primary key (openid)
);


create table daigou(
	did int AUTO_INCREMENT,
	uid varchar(32) NOT NULL,
	destination varchar(100),
	description text,
	imageUrl text,
	status1_image text,  
	status2_image text,
	status int,
	last_for_time varchar(100),
	issue_time	datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	primary key(did),
	foreign key(uid) references user(openid)
);
create table sub_daigou(
	sid int AUTO_INCREMENT,
	uid varchar(32),
	did int,
	description text,
	payment varchar(50),
	status int,
	primary key(sid),
	foreign key(uid) references user(openid),
	foreign key(did) references daigou(did)
	);
create table qiugou(
	did int AUTO_INCREMENT,
	uid varchar(32),
	uid2 varchar(32),
	destination varchar(100),
	description text,
	imageUrl text,
	status1_image text,
	status2_image text,
	last_for_time varchar(100),
	issue_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	primary key(did),
	foreign key(uid) references user(openid),
	foreign key(uid2) references user(openid)
	);

create table sub_qiugou(
	sid int AUTO_INCREMENT,
	uid varchar(32),
	did int,
	description text,
	payment varchar(50),
	status int,
	primary key(sid),
	foreign key(uid) references user(openid),
	foreign key(did) references daigou(did)
	)
