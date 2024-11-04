import 'package:flutter/material.dart';

class BottomAppBarContent extends StatelessWidget {
  const BottomAppBarContent({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      backgroundColor: Colors.black,
      bottomNavigationBar: BottomAppBar(
        color: const Color(0xFFD4BEE4),
        shape: const CircularNotchedRectangle(),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            Column(children: [
              ImageIcon(
                AssetImage("assets/icons/profileIcon.png"),
                size: 30,
                semanticLabel: "Profile",
              ),
              Text("Profile")
            ]),
            Column(children: [
              ImageIcon(
                AssetImage("assets/icons/analyticsIcon2.png"),
                size: 30,
                semanticLabel: "Analytics",
              ),
              Text("Analytics")
            ]),
          ],
        ),
      ),
      floatingActionButton: const FloatingActionButton(
        shape: CircleBorder(),
        onPressed: null,
        child: ImageIcon(
          AssetImage("assets/icons/plusIcon.png"),
        ),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
    );
  }
}
