package chatapp;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Font;
import java.awt.Image;
import java.awt.Panel;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import javax.swing.Box;
import javax.swing.BoxLayout;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;
import javax.swing.border.EmptyBorder;

public class Server extends JFrame implements ActionListener {

	JTextField text;
	JPanel p2;
	static Box vertical = Box.createVerticalBox();
	
	Server()
	{
		this.setLayout(null); //to set frame layout user defined
		
		JPanel p1 = new JPanel(); //for creation of panels on the frame
		//p1.setBackground(Color.GREEN);
		p1.setBackground(new Color(7,94,84));
		p1.setBounds(0,0,450,70); //set size of panel -> x,y,width,height
		p1.setLayout(null);
		this.add(p1);
		
		//for back arrow image on panel
		ImageIcon i1 = new ImageIcon(ClassLoader.getSystemResource("icons/arrow.png"));
		Image i2 = i1.getImage().getScaledInstance(25, 25, Image.SCALE_DEFAULT); //setting image size
		ImageIcon i3 = new ImageIcon(i2); //need to convert to image icon to put on the label
		JLabel back = new JLabel(i3);
		back.setBounds(5, 20, 25, 25); //sets size of arrow image
		p1.add(back); //adding image to panel1
		
		//For mouse click on arrow to exit
		back.addMouseListener(new MouseAdapter() {
		  @Override
		public void mouseClicked(MouseEvent e) {
              System.exit(0);
		  } 
		  
		});
		
		//for profile image on panel
		ImageIcon i4 = new ImageIcon(ClassLoader.getSystemResource("icons/profile.png"));
		Image i5 = i4.getImage().getScaledInstance(50, 50,Image.SCALE_DEFAULT); //setting image size
		ImageIcon i6 = new ImageIcon(i5); //need to convert to image icon to put on the label
		JLabel profile = new JLabel(i6);
		profile.setBounds(40, 10, 50, 50);  //setting label size on panel
		p1.add(profile); //adding image to panel1
		
		//for video image on panel
		ImageIcon i7 = new ImageIcon(ClassLoader.getSystemResource("icons/video.png"));
		Image i8 = i7.getImage().getScaledInstance(30, 30, Image.SCALE_DEFAULT); //setting image size
		ImageIcon i9 = new ImageIcon(i8); //need to convert to image icon to put on the label
		JLabel video = new JLabel(i9);
		video.setBounds(300, 20, 30, 30); //setting label size on panel
		p1.add(video); //adding image to panel1
		
		//for call image on panel
		ImageIcon i10 = new ImageIcon(ClassLoader.getSystemResource("icons/phone.png"));
		Image i11 = i10.getImage().getScaledInstance(35, 30, Image.SCALE_DEFAULT); //setting image size
		ImageIcon i12 = new ImageIcon(i11); //need to convert to image icon to put on the label
		JLabel call = new JLabel(i12);
		call.setBounds(360, 20, 35, 30); //setting label size on panel
		p1.add(call); //adding image to panel1
		
		//for image image on panel
		ImageIcon i13 = new ImageIcon(ClassLoader.getSystemResource("icons/3icon.png"));
		Image i14 = i13.getImage().getScaledInstance(10, 25, Image.SCALE_DEFAULT);
		ImageIcon i15 = new ImageIcon(i14); //need to convert to image icon to put on the label
		JLabel moreopt = new JLabel(i15);
	    moreopt.setBounds(420, 20, 10, 25);  //setting label size on panel
		p1.add(moreopt); //adding image to panel1
		
		//jLabel helps in mainly writing on the frame
		
		//Writing your name on panel
		JLabel name = new JLabel("chan");
		name.setBounds(110, 15, 100, 18); //Setting label size on panel
		name.setForeground(Color.WHITE);
		name.setFont(new Font("SAN_SERIF", Font.BOLD, 18));
		p1.add(name);
		
		JLabel status = new JLabel("Active now");
		status.setBounds(110, 35, 100, 18);
		status.setForeground(Color.WHITE);
		status.setFont(new Font("SAN_SERIF", Font.PLAIN, 10));
		p1.add(status);
		
		//creating another panel for chat
		
		p2 = new JPanel();
		p2.setBounds(5, 75, 440, 570);
		this.add(p2);
		
		//panel for typing chat text
		text = new JTextField();
		text.setBounds(5, 655, 310, 40);
		text.setFont(new Font("SAN_SARIF", Font.PLAIN, 16));
		this.add(text);
		
		//creating button for send
		JButton send = new JButton("Send");
		send.setBounds(320, 655, 123, 40);
		send.setBackground(new Color(7, 94, 84));
		send.setForeground(Color.WHITE);
		send.setFont(new Font("SAN_SARIF", Font.PLAIN, 16));
		send.addActionListener(this);
		this.add(send);
		
		//setting main frame
		this.setSize(450,700);
		this.setLocation(200,50); //to set top and side distance
		this.getContentPane().setBackground(Color.WHITE); //to set main frame background
		this.setUndecorated(true);
		this.setVisible(true);
		
	}
	
	@Override
	public void actionPerformed(ActionEvent e) {
		String out = text.getText(); //to get chat text

		//System.out.println(out);
		
		//JLabel output = new JLabel(out);
		
		//JPanel p3 = new JPanel();
		
        JPanel p3 = formatLabel(out); //function to format the chat label
        
        //p3.add(output);

        p2.setLayout(new BorderLayout()); //to create a new boarder on 2nd panel

        //right side panel creation
        JPanel right = new JPanel(new BorderLayout()); //creates a right panel by creating a new border
        right.add(p3, BorderLayout.LINE_END); //until the line ends
        //creating vertical boxes between each message
        vertical.add(right); 
        vertical.add(Box.createVerticalStrut(15));

        //adding the vertical panel to main panel p2 at page starting
        p2.add(vertical, BorderLayout.PAGE_START);
        
        //repaints on the panel
        this.repaint();
        this.invalidate();
        this.validate();
        text.setText(" ");
		
	}
	
	public static JPanel formatLabel(String out) {
        //creation of message panel p3      
		JPanel panel = new JPanel();
		//setting the layout with box layout, one after the another it should come, so y-axis
        panel.setLayout(new BoxLayout(panel, BoxLayout.Y_AXIS));
        
        //message text width,font,background, opaque, border
        JLabel output = new JLabel("<html><p style=\"width: 150px\">" + out + "</p></html>");
        output.setFont(new Font("Tahoma", Font.PLAIN, 16));
        output.setBackground(new Color(37, 211, 102));
        output.setOpaque(true);
        output.setBorder(new EmptyBorder(15, 15, 15, 50));
        
        panel.add(output);
        
        //to get system time for each message below
        Calendar cal = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
        
        JLabel time = new JLabel();
        time.setText(sdf.format(cal.getTime()));
        
        panel.add(time);
        
        return panel;
    }
	
	
	public static void main(String[] args) {
		new Server();
	}
		
	
}