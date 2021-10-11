 class Users {
     
    constructor(UserNiCK){
        
        
        const userList = document.getElementById('users');
        const socket = io.connect();
        var users;

        
        // const game = new Game()
        // game.player;
        // const users = [];
        // var userid;


        // 텍스트1 팀명 : BIT 
		// fontLoader.load("/libs/three.js-master/examples/fonts/helvetiker_regular.typeface.json", function (font) {
		// 	const fgeometry = new THREE.TextGeometry('BIT ', {
		// 		font: font,
		// 		size: 500, // 텍스트 크기
		// 		height: 20, // 돌출 두께
		// 		curveSegments: 12, // 곡선의 점 : 기본값 12
		// 		bevelEnabled: true, // 윤곽선 on
		// 		bevelThickness: 10, // 윤곽선 두께? : 기본값 10
		// 		bevelSize: 8, //텍스트 윤곽선 : 기본값 8
		// 		bevelOffset: 0, // 텍스트 윤곽선이 시작 되는 거리 : 기본값 0
		// 		bevelSegments: 5
		// 	});
		// 	fgeometry.center();
		// 	game.textMesh2 = new THREE.Mesh(fgeometry, [
		// 		new THREE.MeshPhongMaterial({ color: 0xad4000 }), // front
		// 		new THREE.MeshPhongMaterial({ color: 0x5c2301 })	 // side
		// 	])
		// 	game.textMesh2.castShadow = true
		// 	game.textMesh2.position.set(-1300, 900, -6000) // 텍스트 위치
		// 	game.scene.add(game.textMesh2)
		// });

        
        const usernick = UserNiCK;

        socket.on('setId', function (data) {
            //userid = data.id;
            console.log('들고와진다' + data.id);

           socket.emit('nickdata', {nick: usernick, id: data.id});
		});

        socket.on('nicksave', (data)=>{
             userList.innerHTML = `
             ${data.map(data => `<br>${data.nick}`).join(',')}`
              users = data;
            // users.push(user)
            
           
        })

        socket.on('deleteData', (delid) => {
            for (let i = 0; i < users.length; i++) {
                if (users[i].id == delid.id) {
                    console.log("탈퇴유저:", users[i].id);
                    return users.splice(i, 1);
                }
            }
            userList.innerHTML = `
            ${users.map(users => `<br>${users.nick}`).join(',')}`
            
            socket.emit('updateData', users)
            
        })
        console.log("배열확인", users);
    }


    

// userJoin(id, usernick){

//     const user = {id, usernick};

//     users.push(user);
    

//     return user;
// }

// getCurrentUser(id){
//     return users.find(user => user.id === id);
// }

// userLeave(id){
//     const index = users.findIndex(user => user.id === id);

//     if(index !== -1){
//         return users.splice(index , 1)[0];
        
//     }
// }



}


// module.exports = {
//     userJoin,
//     getCurrentUser,
//     userLeave
// }